import os


def list_dir(directory: str, indent: int = 0) -> str:
    output = ""
    try:
        entries = sorted(os.listdir(directory))
    except PermissionError:
        return f"{'  ' * indent}- [Permission Denied]\n"

    for entry in entries:
        path = os.path.join(directory, entry)
        output += f"{'  ' * indent}- {entry}\n"
        if os.path.isdir(path):
            output += list_dir(path, indent + 1)
    return output

if __name__ == "__main__":
    target_dir = r"C:\Users\mezom\OneDrive\Documents\VSCode\FreePass\freepass-mobile\src\app"  # change this path
    print(target_dir)
    structure = list_dir(target_dir)
    print(structure)

    # Optionally write to file:
    with open("structure.txt", "w", encoding="utf-8") as f:
        f.write(structure)
