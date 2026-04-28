# from matplotlib import text

from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings


# Conexion a PostgresSQL usando SQLAlchemy
engine = create_engine(settings.DATABASE_URL,
                    pool_pre_ping=True,
                    pool_size=10,
                    max_overflow=20)

try:
    with engine.connect() as conn:
        # Ejecuta una consulta simple para obtener el nombre de la DB
        result = conn.execute(text("SELECT current_database()"))
        db_name = result.scalar()
        print(f"\nDATABASE CHECK: Conectado exitosamente a la base de datos: '{db_name}'")
        print(f"URL: {settings.DATABASE_URL}\n")
except Exception as e:
    print(f"\nERROR DE CONEXIÓN: {e}\n")
    
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency para obtener la sesión de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


