import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Badge } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import SlotForm from "./form/SlotForm";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));


export default function BookSlot() {
  const [showForm, setShowForm] = React.useState(false); // State to control form visibility
  const [slots, setSlots] = React.useState([]); // State to store slots fetched from backend
  const [selectedSlotId, setSelectedSlotId] = React.useState(null);

  React.useEffect(() => {
    fetchSlots(); // Fetch slots from the backend
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await axios.get("/fatchSlot"); 
      const slotData = response.data; // Use response.data directly
      // console.log(response[0].data.booked)
      setSlots(slotData);
      // console.log(slots);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  const handleBookButtonClick = (slotId) => {
    // Step 2: Update the selected slot ID
    setSelectedSlotId(slotId);
    setShowForm(true);
  };

  const handleBackButtonClick = () => {
    setSelectedSlotId(null); // Reset the selected slot ID when going back
    setShowForm(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {showForm ? (
          <Grid item xs={12}>
            <div className="px-4 md:px-0">
              {" "}
              {/* Apply padding on mobile screens */}
              <div className="max-w-lg mx-auto pl-20 pr-20">
                {" "}
                {/* Center and add padding */}
                <SlotForm slotId={selectedSlotId} />
                <div className="mt-4">
                  <Button
                    onClick={handleBackButtonClick}
                    startIcon={<FaArrowLeft />}
                    // className="text-gray-800"
                  >
                    Back
                  </Button>
                </div>
              </div>
            </div>
          </Grid>
        ) : (
          slots.map((slot) => (
            <Grid key={slot._id} item xs={12} sm={6} md={4}>
              <Item
                style={{
                  marginBottom: "20px",
                }}
              >
                <div className="font-bold mt-4">
                  Date:{" "}
                  {new Date(slot.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
                <div className="font-bold mb-4">
                  Time:{" "}
                  {new Date(slot.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  <br />
                  {/* Your Local Time:{" "}
                  {new Date(slot.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })} */}
                  <p className="font-bold">time is according to the UK</p>
                </div>

                <Badge.Ribbon
                  text={
                    slot.pending
                      ? "Pending for Confirm"
                      : slot.booked
                      ? "Booked"
                      : "Available"
                  }
                  color={slot.pending ? "cyan" : slot.booked ? "pink" : "green"}
                  className="-top-28"
                  style={
                    window.innerWidth < 640 // Check if the screen width is less than 640px (xs screen size)
                      ? { marginRight: "180px" } // Add margin for xs screen size
                      : {} // No margin for larger screens
                  }
                />

                <button
                  style={{
                    backgroundColor:
                      slot.booked || slot.pending ? "#A0A0A0" : "#1F2937",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    transition: "background-color 0.3s, transform 0.3s",
                  }}
                  onClick={() => handleBookButtonClick(slot._id)}
                  disabled={slot.booked || slot.pending}
                  className="w-24 bg-gray-800 text-white px-4 py-2 rounded transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 hover:bg-gray-600 duration-300"
                >
                  {slot.pending ? "Pending" : slot.booked ? "Booked" : "Book"}
                </button>
              </Item>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
