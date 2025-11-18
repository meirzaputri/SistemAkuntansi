# Teknologi Backend

-   Laravel 11
-   Postgree
-   tymon jwt (Authentication)

# Instalasi

composer install
cp .env.example .env
php artisan key:generate

# Konfigurasi Database Postgree

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_DATABASE=your_db_name
DB_USERNAME=root
DB_PASSWORD=

# Migrasi Database

php artisan migrate --seed

# Menjalankan Server

php artisan serve
