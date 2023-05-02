"""init

Revision ID: 04530381090e
Revises: 
Create Date: 2023-02-17 10:21:39.834617

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "04530381090e"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "buildings",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("name", sa.VARCHAR(100), unique=True, nullable=False),
    )


def downgrade() -> None:
    try:
        op.drop_table("buildings")
    except:
        pass
