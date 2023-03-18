import sys
import db.migrations as migrations

from db.get_data import get_data


# ALEMBIC MIGRATION


# db migration funcs
if __name__ == "__main__":
    try:
        script_action = {
            "db-migrate": migrations.db_migration,
            "get-data": get_data,
        }
        action = sys.argv[1]
        fn = script_action.get(action)
        if not fn:
            sep = ", "
            raise ValueError(
                f"action not allowed, try one of the following: {sep.join(script_action.keys())}"
            )

        fn()

    except IndexError:
        print("Missing arg")

    except ValueError as e:
        print(e)
