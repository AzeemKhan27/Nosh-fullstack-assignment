import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); 

export default function App() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetchDishes();

    socket.on("dishUpdated", (updatedDish) => {
      setDishes(prev =>
        prev.map(dish =>
          dish.dishId === updatedDish.dishId ? updatedDish : dish
        )
      );
    });

    return () => socket.off("dishUpdated");
  }, []);

  const fetchDishes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/dishes");
      setDishes(res.data);
    } catch (err) {
      console.error("Error fetching dishes:", err);
    }
  };

  const togglePublish = async (dishId) => {
    try {
      await axios.patch(`http://localhost:5000/api/dishes/${dishId}/toggle`);
    } catch (err) {
      console.error("Toggle failed:", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Nosh Dish Dashboard</h1>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: 20
      }}>
        {dishes.map(dish => (
          <div key={dish.dishId} style={{ border: "1px solid #ccc", padding: 15, borderRadius: 10 }}>
            <img src={dish.imageUrl} alt={dish.dishName} style={{ width: "100%", borderRadius: 10 }} />
            <h3>{dish.dishName}</h3>
            <p>Status: <strong>{dish.isPublished ? "Published" : "Unpublished"}</strong></p>
            <button onClick={() => togglePublish(dish.dishId)}>
              Toggle Status
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
