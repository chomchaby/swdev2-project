import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function CustomSelect({
  items,
  selectedItem,
  onChange,
  label,
  helpertext,
  error = false,
}: {
  items: { label: string; value: string }[];
  selectedItem: string;
  onChange: Function;
  label?: string;
  helpertext?: string;
  error?: boolean;
}) {
  console.log(helpertext);
  return (
    <FormControl fullWidth size="small" error={error}>
      <InputLabel
        id="demo-simple-select-helper-label"
        sx={{
          "&.Mui-focused": {
            color: "#556AEB", // Focus color, equivalent to primary-500
          },
        }}
      >
        {label}
      </InputLabel>
      <Select
        sx={{
          color: "#495057", // Set text color to neutral-700
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#556AEB", // Adjust hover color to primary-500
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#556AEB", // Adjust focus color to primary-500
          },
        }}
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={selectedItem}
        label={label}
        onChange={(event: SelectChangeEvent) => {
          onChange(event.target.value);
        }}
      >
        {items.map((item) => (
          <MenuItem
            key={item.value}
            value={item.value}
            sx={{
              color: "#495057", // Set text color to neutral-700
              // Change background color of MenuItem when selected to primary-100
              backgroundColor:
                selectedItem === item.value ? "#EBEFFF !important" : "inherit",
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helpertext}</FormHelperText>
    </FormControl>
  );
}
