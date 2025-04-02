import os

LOG_FILE = "server.log"
OUTPUT_FILE = "errors_only.log"

try:
    if not os.path.exists(LOG_FILE):
        raise FileNotFoundError(f"Archivo '{LOG_FILE}' no encontrado.")

    with open(LOG_FILE, "r", encoding="utf-8") as infile:
        lines = infile.readlines()

    error_lines = [line for line in lines if "ERROR" in line]

    with open(OUTPUT_FILE, "w", encoding="utf-8") as outfile:
        outfile.writelines(error_lines)

    print(f"Se encontraron {len(error_lines)} líneas con errores. Guardado en '{OUTPUT_FILE}'.")

except FileNotFoundError as e:
    print(f"[ERROR] {e}")
