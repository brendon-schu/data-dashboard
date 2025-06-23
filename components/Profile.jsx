import {useRef, useEffect, useState} from 'react';

const inputClass = "w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

export default function Profile() {

    const formRef = useRef();

    const update = async () => {
        const form = formRef.current;
        const body = {
          name: form.name.value,
          email: form.email.value,
          job_title: form.job_title.value,
          city: form.city.value,
          country: form.country.value,
          latitude: form.latitude.value,
          longitude: form.longitude.value,
        };
        const res = await fetch('/api/saveprofile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const result = await res.json();
    };

    const [username,setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [job_title, setJobTitle] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const fetchData = async () => {
        const res = await fetch('/api/getuser');
        const data = await res.json();
        setUsername(data.username || '');
        setName(data.name || '');
        setEmail(data.email || '');
        setJobTitle(data.job_title || '');
        setCity(data.city || '');
        setCountry(data.country || '');
        setLatitude(data.latitude || '');
        setLongitude(data.longitude || '');
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <form ref={formRef}>
        <div className="flex bg-base-200 border border-base-100 text-base-content p-2 mt-4 rounded">

            <div className="flex-1 p-4">
                <label className="mt-4 block">User Name</label>
                <div className={inputClass} style={{background: "#EEE"}}>{username}</div>

                <label className="mt-4 block">Name</label>
                <input type="text" name="name" defaultValue={name} className={inputClass} /><br />

                <label className="mt-4 block">Email</label>
                <input type="text" name="email" defaultValue={email} className={inputClass} /><br />

                <label className="mt-4 block">Job Title</label>
                <input type="text" name="job_title" defaultValue={job_title} className={inputClass} /><br />
            </div>

            <div className="flex-1 p-4">
                <label className="mt-4 block">City</label>
                <input type="text" name="city" defaultValue={city}  className={inputClass} /><br />

                <label className="mt-4 block">Country</label>
                <input type="text" name="country" defaultValue={country} className={inputClass} /><br />

                <label className="mt-4 block">Latitude</label>
                <input type="text" name="latitude" defaultValue={latitude} className={inputClass} />

                <label className="mt-4 block">Longitude</label>
                <input type="text" name="longitude" defaultValue={longitude} className={inputClass} />

                <button onClick={update} type="button" className="btn btn-info mt-4">Save</button>
            </div>

        </div>
        </form>
    );
}


