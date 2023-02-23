"""room_table_init

Revision ID: 75fef7d3687b
Revises: 41ac2431a6b2
Create Date: 2023-02-18 14:40:35.313354

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "75fef7d3687b"
down_revision = "41ac2431a6b2"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "rooms",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("room", sa.VARCHAR(10), nullable=False),
        sa.Column("building_id", sa.Integer, nullable=False),
        sa.UniqueConstraint("room", "building_id", name="rooms_spf_1"),
    )


def downgrade() -> None:
    try:
        op.drop_table("rooms")
    except:
        pass
