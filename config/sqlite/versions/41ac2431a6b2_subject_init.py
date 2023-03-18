"""subject_init

Revision ID: 41ac2431a6b2
Revises: 04530381090e
Create Date: 2023-02-17 11:04:28.401741

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "41ac2431a6b2"
down_revision = "04530381090e"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "subjects",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("subject", sa.VARCHAR(10), unique=True, nullable=False),
        sa.Column("description", sa.VARCHAR(255), nullable=False),
    )


def downgrade() -> None:
    try:
        op.drop_table("subjects")
    except:
        pass
