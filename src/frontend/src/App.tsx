import { useState } from 'react';

function App() {
  const [greeting, setGreeting] = useState('');
  const [names, setNames] = useState('');
  const [description, setDescription] = useState('');
  const [eventName, setEventName] = useState('');
  const [response, setResponse] = useState(null);

  // Fungsi untuk greeting (tidak berubah)
  function handleSubmit(event: any) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    fetch(`${import.meta.env.VITE_CANISTER_URL}/greet?name=${name}`)
      .then(response => response.json())
      .then((json) => {
        setGreeting(json.greeting);
      });
  }

  // Fungsi untuk generate sertifikat
  const handleGenerate = () => {
    // Data yang akan dikirim ke backend
    const data = {
      names,
      description,
      eventName
    };

    // Mengirim data ke backend
    fetch(`${import.meta.env.VITE_CANISTER_URL}/certificates/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => {
        // Menyimpan respons dari backend
        setResponse(json);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  return (
    <main>
      <div className="container mt-5">
        <h1 className="mb-4">Event Certificate Generator</h1>
<p>This app have functionality to generate event certificate for attendee with only write the name with enter to separate.</p>
        <div className="mb-3">
          <label htmlFor="names" className="form-label">Names (separated by enter):</label>
          <textarea
            className="form-control"
            id="names"
            rows={5}
            value={names}
            onChange={(e) => setNames(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            className="form-control"
            id="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="eventName" className="form-label">Event Name:</label>
          <input
            type="text"
            className="form-control"
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={handleGenerate}
        >
          Generate
        </button>

        {/* Menampilkan hasil respon dari backend */}
        {response && (
          <div className="mt-4">
            <h2>Generated Certificates:</h2>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
