import json



path = r"C:\Users\Web Lead\OneDrive\Documents\Coding\FreePass\data scripts\Sample Data\\"
file = "users.json"

# Choose which field you want
field = "Home Zip Code"
key_field = "Full Name"

# Load JSON file (make sure the file is an array of objects, not just one object)
with open(f'{path}{file}', "r") as f:
    data = json.load(f)

no_key = 0
no_data = 0

for item in data:
    key = item.get(key_field, "")
    data = item.get(field, "")

    if not key:
        no_key += 1

    if not data:
        no_data += 1

    if key and data: 
        print(key, data)

print(f'No {key_field} count: {no_key}')
print(f'No {field} count: {no_data}')


