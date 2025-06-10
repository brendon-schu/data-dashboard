
import { useState } from 'react';

export default function SetupInstall() {

    const [message, setMessage] = useState('');

	const handleInstall = async () => {
		setMessage('Installing tables...');
		try {
			const res = await fetch('/api/install',{method:'POST'});
			const result = await res.json();

			if (result.success) {
				setMessage('Installation successful! You can now log in.');
			} else {
				setMessage(`Error: ${result.error || 'Unknown issue'}`);
			}
		} catch (err) {
			setMessage(`Request failed: ${err.message}`);
		}
	};


	return (
		<div className="p-4 max-w-md mx-auto">
			<p className="mb-4">Click below to create required database tables:</p>

			<button onClick={handleInstall} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" > Install Tables </button>

			{message && <p className="mt-4">{message}</p>}
		</div>
	);
}
