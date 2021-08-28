import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "./styles.css";
import { PropTypes } from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 5,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 500,
    width: 800
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  button1: {
    position: "absolute",
    right: "180px",
    bottom: "50px",
    border: "none",
    color: "#ff8640",
    textTransform: "Capitalize"
  },
  button2: {
    position: "absolute",
    right: "90px",
    bottom: "50px",
    border: "none",
    backgroundColor: "#ff8640",
    color: "white",

    "&:hover": {
      color: "white",
      backgroundColor: "#ff8640"
    }
  },

  closebutton: {
    position: "absolute",
    right: "20px",
    top: "20px",
    border: "none",
    backgroundColor: "transparent",
    color: "#ff8640",
    fontSize: "20px",
    "&:hover": {
      color: "#ff8640"
    }
  },
  radio: {
    "&$checked": {
      color: "#ff8640"
    }
  },
  checked: {}
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={8}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};
const TabStyle = withStyles((theme) => ({
  root: {
    padding: "2rem 1rem",
    textTransform: "uppercase",
    fontWeight: theme.typography.fontWeightBold,
    fontSize: "1rem",
    color: "black",
    fontFamily: ["-apple-system", "BlinkMacSystemFont", "Roboto"].join(","),
    "&:hover": {
      color: "#ff8640",
      opacity: 1
    },
    transition: "all 0.4s ease",
    "&$selected": {
      color: "#ff8640",
      fontWeight: theme.typography.fontWeightMedium
    }
  },
  tab: {
    padding: "0.5rem",
    fontFamily: "Open Sans",
    fontSize: "2rem",
    backgroundColor: "grey",
    color: "black",
    "&:hover": {
      color: "#ff8640",
      opacity: 1
    }
  },
  selected: {}
}))((props) => <Tab disableRipple {...props} />);

export default function Filter({ setQuery, showFilter, query }) {
  const history = useHistory();
  const cuisineType = [
    "American",
    "Asian",
    "British",
    "Caribbean",
    "Central Europe",
    "Chinese",
    "Eastern Europe",
    "French",
    "Indian",
    "Italian",
    "Japanese",
    "Kosher",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "South American",
    "South East Asian"
  ];
  const mealType = ["Breakfast", "Lunch", "Dinner", "Snack", "Teatime"];

  const classes = styles();
  const [IndexValue, setIndexValue] = useState(0);
  const [value, setValue] = useState(query);
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = useState("");
  const handleChange = (event, newValue) => {
    setIndexValue(newValue);
  };

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(" ");
    setError(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    value == "" ? setHelperText("Please select an option") : null;
    if (cuisineType.includes(value)) {
      setQuery(value);
      showFilter((on) => !on);
      history.push(`/home/${value}`);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={classes.root}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={IndexValue}
            className={classes.tabs}
            onChange={handleChange}
            style={{ padding: "5rem 0" }}
            TabIndicatorProps={{ style: { background: "#ff8640" } }}
          >
            <TabStyle label="Cuisine" />
            <TabStyle label="Health" />
            <TabStyle label="Meal Type" />
          </Tabs>

          <FormControl
            component="fieldset"
            error={error}
            className="filter-cuisines"
          >
            <TabPanel className="filter-tab" value={IndexValue} index={0}>
              <RadioGroup
                className="filter-cuisines"
                value={value}
                onChange={handleRadioChange}
              >
                {cuisineType.map((e, i) => (
                  <FormControlLabel
                    key={i}
                    value={e}
                    control={
                      <Radio
                        classes={{
                          root: classes.radio,
                          checked: classes.checked
                        }}
                      />
                    }
                    label={e}
                  />
                ))}
              </RadioGroup>
            </TabPanel>
          </FormControl>
          <FormControl
            component="fieldset"
            error={error}
            className="filter-cuisines"
          >
            <TabPanel className="filter-tab" value={IndexValue} index={1}>
              <RadioGroup
                className="filter-cuisines"
                value={value}
                onChange={handleRadioChange}
              >
                {mealType.map((e, i) => (
                  <FormControlLabel
                    key={i}
                    value={e}
                    control={
                      <Radio
                        classes={{
                          root: classes.radio,
                          checked: classes.checked
                        }}
                        disabled
                      />
                    }
                    label={e}
                  />
                ))}
              </RadioGroup>
            </TabPanel>
          </FormControl>
          <TabPanel value={IndexValue} index={2}>
            Need to be Added
          </TabPanel>
          <FormHelperText
            style={{
              color: "red",
              position: "absolute",
              top: "50px",
              left: "200px"
            }}
          >
            {helperText}
          </FormHelperText>
          <Button
            variant="outlined"
            className={classes.button1}
            onClick={() => {
              setValue("");
            }}
          >
            Clear All
          </Button>
          <Button type="submit" variant="outlined" className={classes.button2}>
            Apply
          </Button>
        </div>
      </form>
    </>
  );
}
