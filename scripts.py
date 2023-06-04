import sys
import functions.db.migrations as migrations

from functions.db.get_data import get_data

if __name__ == "__main__":
    try:
        script_action = {
            "db-migrate": migrations.db_migration,
            "get-data": get_data,
        }
        action = sys.argv[1]
        fn = script_action.get(action)
        if not fn:
            sep = "|"
            raise ValueError(f"usage: [{sep.join(script_action.keys())}]")

        fn()

    except IndexError:
        print("Missing arg")

    except ValueError as e:
        print(e)
