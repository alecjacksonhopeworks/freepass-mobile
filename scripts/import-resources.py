import json
import os
import asyncio
import usaddress
from dotenv import load_dotenv
from supabase import create_client

# Load environment variables from .env
load_dotenv()

# -----------------------------
# Configuration
# -----------------------------
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

path = r'C:\Users\Web Lead\OneDrive\Documents\Coding\FreePass\data scripts\Sample Data\resources.json'

# List of all expected fields in your JSON
FIELDS = [
    "ID",
    "Company Name",
    "LOCATION",
    "Lat Long",
    "Test ID 1",
    "Test ID 2",
    "Service Type 1",
    "Service Type 2",
    "Service Type 3",
    "Abbv.",
    "Text Description",
    "Phone Number",
    "Phone 2",
    "Extension",
    "Web Address",
    "Main Email",
    "State",
    "Zip Code",
    "County",
    "Region",
    "Hours",
    "Main Name",
    "Main First",
    "Main Last",
    "Main Contact Position",
    "Main Contact Phone",
    "Main Contact Email",
    "Secondary Name",
    "Secondary First Name",
    "Secondary Last Name",
    "Secondary Contact Position",
    "Secondary Contact Phone",
    "Secondary Contact Email",
    "Image",
    "Notes",
    "Verified",
    "Replies Often?",
    "Contacted Often?",
    "Has Been Interviewed?",
    "Draft?",
    "Street View URL",
    "Map Embed URL",
]

# -----------------------------
# Helper functions
# -----------------------------
def parse_location(location: str):
    """Parse a raw LOCATION string using usaddress."""
    if not location:
        return {
            "address_line1": "",
            "address_line2": None,
            "city": "",
            "state": "",
            "zip_code": "",
        }
    try:
        parsed = usaddress.tag(location)[0]
        return {
            "address_line1": parsed.get("AddressNumber", "") + " " + parsed.get("StreetName", ""),
            "address_line2": parsed.get("OccupancyType", "") + " " + parsed.get("OccupancyIdentifier", "") if parsed.get("OccupancyIdentifier") else None,
            "city": parsed.get("PlaceName", ""),
            "state": parsed.get("StateName", ""),
            "zip_code": parsed.get("ZipCode", ""),
        }
    except Exception:
        # fallback if parsing fails
        return {
            "address_line1": location,
            "address_line2": None,
            "city": "",
            "state": "",
            "zip_code": "",
        }


# -----------------------------
# Insert functions
# -----------------------------
async def insert_organization(entry):
    if not entry.get("Company Name") or not entry.get("LOCATION"):
        return None

    org_data = {
        "name": entry.get("Company Name").strip(),
        "description": entry.get("Text Description").strip() or None,
        "website_url": entry.get("Web Address").strip() or None,
        "phone_number": entry.get("Phone Number").strip() or None,
    }

    print(org_data['name'])
    return 

    result = await supabase.table("organization").insert(org_data).select("*").execute()
    return result.data[0]["id"]


async def insert_address(entry, org_id):
    loc_data = parse_location(entry.get("LOCATION", ""))
    latlong = entry.get("Lat Long", "")
    latitude, longitude = None, None
    if latlong:
        parts = latlong.split(",")
        if len(parts) == 2:
            latitude, longitude = float(parts[0].strip()), float(parts[1].strip())

    address_data = {
        "address_line1": loc_data["address_line1"],
        "address_line2": loc_data["address_line2"],
        "city": loc_data["city"],
        "state": loc_data["state"],
        "country": "USA",
        "zip_code": loc_data["zip_code"] or entry.get("Zip Code") or "",
        "latitude": latitude,
        "longitude": longitude,
        "user_id": None,
        "resource_id": None,
        "label": None,
        "is_primary": True,
        "is_private": True,
        "organization_id": org_id
    }

    result = await supabase.table("address").insert(address_data).select("*").execute()
    return result.data[0]["id"]


async def insert_contact(entry, org_id):
    if not entry.get("Main Email") and not entry.get("Main Name"):
        return None

    contact_data = {
        "organization_id": org_id,
        "first_name": entry.get("Main First") or None,
        "last_name": entry.get("Main Last") or None,
        "full_name": entry.get("Main Name") or None,
        "email": entry.get("Main Email") or None,
        "phone": entry.get("Phone Number") or None,
        "label": entry.get("Main Contact Position") or None,
        "user_id": None,
    }

    result = await supabase.table("organization_contact").insert(contact_data).select("*").execute()
    return result.data[0]["id"]


async def insert_resource(entry, org_id):
    resource_data = {
        "organization_id": org_id,
        "name": entry.get("Company Name"),
        "description": entry.get("Text Description") or None,
        "website": entry.get("Web Address") or None,
        "phone_number": entry.get("Phone Number") or None,
        "hours": entry.get("Hours") or None,
    }

    result = await supabase.table("resource").insert(resource_data).select("*").execute()
    return result.data[0]["id"]


async def insert_service_types(entry, resource_id, org_id):
    for i in range(1, 4):
        service_type_name = entry.get(f"Service Type {i}")
        if not service_type_name:
            continue

        # Check if service type exists
        service_type = await supabase.table("service_type").select("*").eq("name", service_type_name).execute()
        if service_type.data:
            st_id = service_type.data[0]["id"]
        else:
            new_st = await supabase.table("service_type").insert({"name": service_type_name}).select("*").execute()
            st_id = new_st.data[0]["id"]

        await supabase.table("resource_service_type").insert({
            "resource_id": resource_id,
            "service_type_id": st_id
        }).execute()


async def process_entry(entry):
    org_id = await insert_organization(entry)
    return 
    if not org_id:
        return None
    await insert_address(entry, org_id)
    await insert_contact(entry, org_id)
    resource_id = await insert_resource(entry, org_id)
    await insert_service_types(entry, resource_id, org_id)


def filter_and_sort_resources(data):
    filtered = [entry for entry in data if entry.get("Company Name")]
    
    sorted_list = sorted(filtered, key=lambda x: x["Company Name"].lower())
    
    return sorted_list

# -----------------------------
# Load from file
# -----------------------------
async def process_file(filename):
    with open(filename, "r", encoding="utf-8") as f:
        data_list = json.load(f)
        data_list = filter_and_sort_resources(data_list)
    for entry in data_list:
        await process_entry(entry)

asyncio.run(process_file(path))