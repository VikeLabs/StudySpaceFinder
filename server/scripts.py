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
    os.system("alembic upgrade head")


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


if __name__ == "__main__":
    try:
        script_action = {"db-migrate": db_migration}
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
