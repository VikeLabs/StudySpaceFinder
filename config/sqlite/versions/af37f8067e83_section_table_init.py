"""section_table_init

Revision ID: af37f8067e83
Revises: 75fef7d3687b
Create Date: 2023-02-18 16:09:17.834413

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "af37f8067e83"
down_revision = "75fef7d3687b"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "sections",
        sa.Column("id", sa.Integer, primary_key=True, nullable=False),
        sa.Column("section", sa.VARCHAR(5), nullable=False),
        sa.Column("time_start_int", sa.Integer, nullable=False),
        sa.Column("time_end_int", sa.Integer, nullable=False),
        sa.Column("time_start_str", sa.VARCHAR(9), nullable=False),
        sa.Column("time_end_str", sa.VARCHAR(9), nullable=False),
        sa.Column("monday", sa.BOOLEAN, nullable=False),
        sa.Column("tuesday", sa.BOOLEAN, nullable=False),
        sa.Column("wednesday", sa.BOOLEAN, nullable=False),
        sa.Column("thursday", sa.BOOLEAN, nullable=False),
        sa.Column("friday", sa.BOOLEAN, nullable=False),
        sa.Column("saturday", sa.BOOLEAN, nullable=False),
        sa.Column("sunday", sa.BOOLEAN, nullable=False),
        sa.Column(
            "subject_id",
            sa.INTEGER,
            sa.ForeignKey("user.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column(
            "building_id",
            sa.INTEGER,
            sa.ForeignKey("buildings.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column(
            "room_id",
            sa.INTEGER,
            sa.ForeignKey("rooms.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.UniqueConstraint("section", "subject_id", name="sections_spf_1"),
    )


def downgrade() -> None:
    try:
        op.drop_index("sections")
    except:
        pass
