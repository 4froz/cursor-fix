import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import InputAdornment from "@mui/material/InputAdornment";

const GEOAPIFY_KEY = "3bee10c1f5774270954bd4578492f49d";
const MAX_RESULTS = 5;

const GeoapifyAutocomplete = ({
  onSelect,
  settouched,
  err,
  touched,
  address,
  setaddress,
}) => {
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const skipRequest = useRef(false); // prevents fetch after manual selection

  useEffect(() => {
    if (skipRequest.current) {
      skipRequest.current = false;
      return;
    }

    if (!address) {
      setResults([]);
      setOpen(false);
      setLoading(false);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://api.geoapify.com/v1/geocode/autocomplete",
          {
            params: {
              text: address,
              apiKey: GEOAPIFY_KEY,
              lang: "en",
              limit: MAX_RESULTS,
                filter: "countrycode:in",
            },
          }
        );
        setResults(res.data.features || []);
        setOpen(true);
      } catch (err) {
        setResults([]);
        setOpen(false);
        console.error("Geoapify error:", err);
      }
      setLoading(false);
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [address]);

  const handleSelect = (item) => {
    skipRequest.current = true;
    setOpen(false);

    const { name, address_line1, address_line2, postcode, city, state } =
      item.properties;

    const addressLine2Part = address_line2?.split(",")[0]?.trim();

    const displayAddress =
      addressLine2Part && addressLine2Part !== city
        ? `${address_line1}, ${addressLine2Part}`
        : address_line1;

    onSelect?.({
      postalcode: postcode,
      address: displayAddress,
      city,
      state,
    });

    setaddress(displayAddress);
    setResults([]);
    inputRef.current?.blur();
  };

  const handleInputChange = (e) => {
    setaddress(e.target.value);
    setOpen(!!e.target.value);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <TextField
            required
            onBlur={() => settouched((prev) => ({ ...prev, address: true }))}
            error={(touched.address || err) && !address}
            helperText={
              (touched.address || err) && !address ? "Address is required" : ""
            }
            inputRef={inputRef}
            fullWidth
            label="Address"
            variant="outlined"
            value={address}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            autoComplete="off"
            sx={{
              mt: 2,
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px white inset",
                WebkitTextFillColor: "black",
                transition: "background-color 5000s ease-in-out 0s",
              },
              "& label": {
                color: "#A1A1A1",
                fontWeight: 400,
              },
              "& label.Mui-focused": {
                color: "black",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.5rem",
                "& fieldset": {
                  borderColor: "#A1A1A1",
                },
                "&:hover fieldset": {
                  borderColor: "#A1A1A1",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "black",
                  borderWidth: "2px",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ display: "block" }}
                  >
                    <circle
                      cx="9"
                      cy="9"
                      r="7"
                      stroke="#000"
                      strokeWidth="1"
                      fill="none"
                    />
                    <line
                      x1="14.5"
                      y1="14.5"
                      x2="18"
                      y2="18"
                      stroke="#000"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                  </svg>
                </InputAdornment>
              ),
            }}
          />
          {open && results.length > 0 && (
            <Paper
              elevation={2}
              sx={{
                position: "absolute",
                zIndex: 10,
                left: 0,
                right: 0,
                mt: 1,
                maxHeight: 500,
              }}
            >
              <div className="w-full sticky top-0 px-[16px] flex justify-between pt-4">
                <h1
                  style={{ fontFamily: "LaNordLight", fontWeight: 700 }}
                  className="text-[16px] flex items-start"
                >
                  Suggestions
                </h1>
                <button
                  className="text-gray-900 cursor-pointer hover:text-gray-500 text-2xl"
                  aria-label="Close"
                  onClick={() => setOpen(false)}
                >
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <List dense>
                {results.map((item) => (
                  <ListItem
                    key={item.properties.place_id}
                    disablePadding
                    onClick={() => handleSelect(item)}
                  >
                    <ListItemButton>
                      <ListItemText
                        primary={item.properties.formatted}
                        secondary={
                          item.properties.city ||
                          item.properties.state ||
                          item.properties.postcode
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default GeoapifyAutocomplete;
