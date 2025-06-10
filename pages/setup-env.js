
export default function EnvSetupPage() {

    return (
        <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Missing .env configuration</h1>
        <h1 className="text-2xl font-bold text-red-600">Or database not present.</h1>
        <p className="mt-4">Please create a valid <code>.env</code> file with the required settings before continuing.</p>
        <p className="mt-4">And create the required database.</p>
		<div className="text-left max-w-[500px] bg-gray-200 m-auto mt-4 p-4">
		DB_USER=your_postgres_user<br />
		DB_PASS=your_postgres_password<br />
		DB_NAME=your_database_name<br />
		DB_HOST=localhost<br />
		DB_PORT=5432
		</div>
        <a href="/" className="mt-4">Try Again</a>
    </div>
    );

}

