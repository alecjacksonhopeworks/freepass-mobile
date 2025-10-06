import json
import os
import requests
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

path = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), 
    r'Sample Data\resources.json'
    )

TABLES_TO_CLEAR = [
    "resource",
    "organization",
    "resource_service_type",
    "contact",
    "address",
]

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

convert_st = {
    "Community Reintegration": "Community & Family Reintegration",
    "Family Reintegration Support": "Community & Family Reintegration",
    "Housing": "Housing Assistance",
    "Jobs": "Employment",
    "Life Skills Training": "Life Skills"
}

org_ids = {
    'Bethesda Project': None,
    'Catholic Social Services': None,
    'City Fitness': None,
    'Lutheran Settlement House': None,
    'PA CareerLink': None,
    'Project HOME': None,
    'Impact Services Corporation': None
}


def get_adalo_image_url(image_field):
    if not image_field:
        return None
    if isinstance(image_field, dict):
        image_data = image_field
    elif isinstance(image_field, str):
        # Replace single quotes with double quotes for valid JSON
        try:
            image_json = image_field.replace("'", '"')
            image_data = json.loads(image_json)
        except json.JSONDecodeError:
            print("Error parsing image field")
            return None
    else:
        return None

    url = image_data.get("url")
    if url:
        return f"https://adalo-uploads.imgix.net/{url}"
    return None


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


async def insert_organization(entry):
    if not entry.get("Company Name") or not entry.get("LOCATION"):
        return None
    

    org_data = {
        "name": entry.get("Company Name").strip(),
        "description": entry.get("Text Description").strip() or None,
        "website_url": entry.get("Web Address").strip() or None,
        "phone_number": entry.get("Phone Number").strip() or None,
        "logo_uri": get_adalo_image_url(entry.get("Image")),
    }
    
    save_org_name = None 
    for name in org_ids.keys():
        if name in org_data['name']:
            org_id = org_ids[name]
            if org_id:
                return org_id
            else:
                 save_org_name = name
    
    print(org_data['name'], org_data['logo_uri'])
     

    result = supabase.table("organization").insert(org_data).execute()
    if save_org_name:
        org_ids[save_org_name] = result.data[0]["id"]
        
    print("Insert organization:", result.data[0]['id'], result.data[0]['name']) 
    return result.data[0]["id"]


GEOCODE_API_URL = "https://nominatim.openstreetmap.org/search"

def get_lat_long_from_address(address):
    GEOCODE_API_URL = "https://nominatim.openstreetmap.org/search"
    if not address:
        return None, None
    try:
        parsed = usaddress.tag(address)[0]
        street = " ".join(filter(None, [parsed.get("AddressNumber", ""), parsed.get("StreetName", ""), parsed.get("StreetNamePostType", "")]))
        city = parsed.get("PlaceName", "")
        state = parsed.get("StateName", "")
        zip_code = parsed.get("ZipCode", "")
        full_address = f"{street}, {city}, {state} {zip_code}".strip(", ")
    except Exception:
        full_address = address

    params = {
        "q": full_address,
        "format": "json",
        "limit": 1,
        "addressdetails": 1
    }

    try:
        response = requests.get(GEOCODE_API_URL, params=params, headers={"User-Agent": "FreePassScript/1.0"})
        response.raise_for_status()
        data = response.json()
        if data:
            lat = float(data[0]["lat"])
            lon = float(data[0]["lon"])
            print('geocode success', address, lat, lon)
            return lat, lon
    except Exception as e:
        print(f"Geocoding error for '{address}': {e}")

    return None, None


async def insert_address(entry, resource_id):
    
    loc_data = parse_location(entry.get("LOCATION", ""))
   
    latlong = entry.get("Lat Long", "")
    latitude, longitude = None, None
    if latlong:
        parts = latlong.split(",")
        if len(parts) == 2:
            latitude, longitude = float(parts[0].strip()), float(parts[1].strip())
    if not latlong:
        latitude, longitude = get_lat_long_from_address(entry.get("LOCATION", ""))
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
        "resource_id": resource_id,
        "label": None,
        "is_primary": True,
        "is_private": False
    }

    result = supabase.table("address").insert(address_data).execute()
    print(f'inserted address {loc_data} for resource {resource_id}')

    return result.data[0]["id"]

async def insert_contact(entry, resource_id):
    contacts = []
    
    def split_full_name(full_name: str):
        if not full_name:
            return None, None
        parts = full_name.strip().split()
        if len(parts) == 1:
            return parts[0], None  # Only first name
        first_name = " ".join(parts[:-1])
        last_name = parts[-1]
        return first_name, last_name
        

    if entry.get("Main Name"):
        first, last = split_full_name(entry.get("Main Name"))
        contacts.append({
            "resource_id": resource_id,
            "first_name": first or None,
            "last_name": last or None,
            "email": entry.get("Main Email") or None,
            "phone": entry.get("Phone Number") or None,
            "label": entry.get("Main Contact Position") or 'Primary',
            "user_id": None,
        })

    if entry.get("Secondary Name"):
        first, last = split_full_name(entry.get("Secondary Name"))
        contacts.append({
            "resource_id": resource_id,
            "first_name": first or None,
            "last_name": last or None,
            "email": entry.get("Secondary Contact Email") or None,
            "phone": entry.get("Secondary Contact Phone") or None,
            "label": entry.get("Secondary Contact Position") or 'Secondary',
            "user_id": None,
        })

    if not contacts:
        return

    supabase.table("contact").insert(contacts).execute()
    print(f"Inserted {len(contacts)} contacts for resource {resource_id}")


async def insert_resource(entry, org_id):
    resource_data = {
        "organization_id": org_id,
        "name": entry.get("Company Name"),
        "description": entry.get("Text Description") or None,
        "hours": entry.get("Hours") or None,
    }

    result = supabase.table("resource").insert(resource_data).execute()
    
    print("Insert resource:", result.data[0]['id'], result.data[0]['name']) 
    return result.data[0]["id"]


async def insert_service_types(entry, resource_id):
    for i in range(1, 4):
        service_type_name = entry.get(f"Service Type {i}")
        if not service_type_name:
            continue

        if service_type_name in convert_st:
            service_type_name = convert_st[service_type_name]
            
        service_type = supabase.table("service_type").select("*").eq("name", service_type_name).execute()
        if service_type.data:
            st_id = service_type.data[0]["id"]

        existing =  supabase.table("resource_service_type") \
            .select("*") \
            .eq("resource_id", resource_id) \
            .eq("service_type_id", st_id) \
            .execute()

        if not existing.data:
            supabase.table("resource_service_type").insert({
                    "resource_id": resource_id,
                    "service_type_id": st_id
                }).execute()
        
        print(f'Inserted {service_type_name} for resource {resource_id}')



async def process_entry(entry):
    org_id = await insert_organization(entry)
     
    if not org_id:
        return None
    resource_id = await insert_resource(entry, org_id)
    await insert_address(entry, resource_id)
    
    await insert_contact(entry, resource_id)


    await insert_service_types(entry, resource_id)


def drop_orgs(data):
    bad_strings = []
    good_data = []
    for entry in data:
        company_name = entry.get('Company Name')
        if company_name:
            include = True
            for bad_string in bad_strings:
                if bad_string in company_name:
                    include = False
                    break
            if include:
                good_data.append(entry)
    return good_data


def clear_supabase_tables():
    for table in TABLES_TO_CLEAR:
        print(f"Deleting data from {table}...")
        response = supabase.table(table).delete().neq("created_at", "2024-10-01T00:00:00+00:00").execute()
        print(f"✅ {table}: {len(response.data or [])} rows deleted.")
    print("🧹 Done! All selected tables cleared.")                


def filter_and_sort_resources(data):
    
    filtered = []
    filtered_out = []
    
    for entry in data:
        company_name = entry.get("Company Name")
        lat_long = entry.get("Lat Long")
        address = entry.get("LOCATION")
        if company_name and (lat_long or address):
            filtered.append(entry)
        else:
            filtered_out.append(entry)
            
    sorted_list = sorted(filtered, key=lambda x: x["Company Name"].lower())
    return sorted_list


async def process_file(filename):
    with open(filename, "r", encoding="utf-8") as f:
        clear_supabase_tables()
        data_list = json.load(f)
        data_list = filter_and_sort_resources(data_list) 
    for entry in data_list:
        await process_entry(entry)

asyncio.run(process_file(path))