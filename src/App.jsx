import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "https://toscani-tenekeu.toscanisoft.cm"; // Change ce lien avec ton vrai domaine

function App() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ nom: "", email: "", telephone: "" });
  const [editId, setEditId] = useState(null);

  const fetchClients = async () => {
    const res = await axios.get(`${API_BASE}/read.php`);
    setClients(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${API_BASE}/update.php`, { id: editId, ...form });
    } else {
      await axios.post(`${API_BASE}/create.php`, form);
    }
    setForm({ nom: "", email: "", telephone: "" });
    setEditId(null);
    fetchClients();
  };

  const handleEdit = (client) => {
    setForm({ nom: client.nom, email: client.email, telephone: client.telephone });
    setEditId(client.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_BASE}/delete.php`, { data: { id } });
    fetchClients();
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>CRUD Clients</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nom"
          value={form.nom}
          onChange={(e) => setForm({ ...form, nom: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          placeholder="Téléphone"
          value={form.telephone}
          onChange={(e) => setForm({ ...form, telephone: e.target.value })}
          required
        />
        <button type="submit">{editId ? "Mettre à jour" : "Ajouter"}</button>
      </form>

      <table border="1" cellPadding="5" style={{ marginTop: 20, width: "100%" }}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.nom}</td>
              <td>{client.email}</td>
              <td>{client.telephone}</td>
              <td>
                <button onClick={() => handleEdit(client)}>Modifier</button>
                <button onClick={() => handleDelete(client.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
