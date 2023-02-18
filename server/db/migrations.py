import os
import sys


# ALEMBIC MIGRATION


# db migration funcs
def new():
    try:
        new_schema = sys.argv[3]
        os.system(f"alembic revision -m '{new_schema}'")
    except IndexError:
        print("Need to supply version name, use snake_case")
        sys.exit()


def deploy():
    os.system("alembic upgrade +1")


def rollback():
    os.system("alembic downgrade -1")


def db_migration():
    db_actions = {"new": new, "deploy": deploy, "rollback": rollback}

    try:
        os.system
        action = sys.argv[2]

        fn = db_actions.get(action)
        if not fn:
            sep = ", "
            raise ValueError(f"Illegal arg, allowed: {sep.join(db_actions.keys())}")

        fn()

    except IndexError:
        print("Missing arg, ie: python migrations.py deploy")
        sys.exit()

    except ValueError as e:
        print(e)
        sys.exit()
