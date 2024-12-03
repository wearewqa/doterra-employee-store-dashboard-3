/* eslint-disable no-restricted-imports */
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import React from "react";
import { FormattedMessage, IntlShape, useIntl } from "react-intl";

const useStyles = makeStyles(
  () => ({
    formLabel: {
      marginBottom: 12,
    },
    radio: {
      padding: 2,
    },
    radioLabel: {
      marginBottom: -12 * 1.5,
      gridTemplateColumns: "30px 1fr",
      margin: 0,
      "&:hover svg.icon-satisfied": {
        fill: "#61D174",
      },
      "&:hover svg.icon-dissatisfied": {
        fill: "#E23645",
      },
      "&:hover svg.icon-neutral": {
        fill: "#415058",
      },
    },
    radioGroup: {
      flexDirection: "row",
      flexWrap: "nowrap",
    },
    root: {
      padding: 0,
      paddingRight: 8,
      minWidth: "initial",
    },
  }),
  {
    name: "ReactionField",
  },
);

function createChoices(intl: IntlShape): ReactionFieldChoice[] {
  return [
    {
      label: intl.formatMessage({
        id: "Y09xUU",
        defaultMessage: "Satisfied",
        description: "Satisfied type",
      }),
      value: "satisfied",
      icon: <SentimentSatisfiedAltIcon color="disabled" className="icon-satisfied" />,
      checkedIcon: <SentimentSatisfiedAltIcon htmlColor="#61D174" />,
    },
    {
      label: intl.formatMessage({
        id: "SMtH9x",
        defaultMessage: "Neutral",
        description: "neutral type",
      }),
      value: "neutral",
      icon: <SentimentSatisfiedIcon color="disabled" className="icon-neutral" />,
      checkedIcon: <SentimentSatisfiedIcon htmlColor="#415058" />,
    },
    {
      label: intl.formatMessage({
        id: "pRo663",
        defaultMessage: "Dissatisfied",
        description: "Dissatisfied type",
      }),
      value: "dissatisfied",
      icon: <SentimentVeryDissatisfiedIcon color="disabled" className="icon-dissatisfied" />,
      checkedIcon: <SentimentVeryDissatisfiedIcon htmlColor="#E23645" />,
    },
  ];
}

export interface ReactionFieldChoice {
  value: string;
  label: React.ReactNode;
  icon: React.ReactNode;
  checkedIcon: React.ReactNode;
}

interface ReactionFieldProps {
  className?: string;
  disabled?: boolean;
  error?: boolean;
  hint?: string;
  label?: string;
  name?: string;
  value: string;
  onChange: (event: React.ChangeEvent<any>) => void;
}

export const ReactionField: React.FC<ReactionFieldProps> = props => {
  const { className, disabled, error, label, value, onChange, name, hint } = props;
  const classes = useStyles(props);
  const intl = useIntl();
  const choices = createChoices(intl);

  return (
    <FormControl className={classNames(classes.root, className)} error={error} disabled={disabled}>
      {label ? <FormLabel className={classes.formLabel}>{label}</FormLabel> : null}

      <RadioGroup
        aria-label={name}
        name={name}
        value={value}
        onChange={onChange}
        className={classes.radioGroup}
      >
        {choices.length > 0 ? (
          choices.map(choice => (
            <FormControlLabel
              value={choice.value}
              className={classes.radioLabel}
              control={
                <Radio
                  color="primary"
                  className={classes.radio}
                  icon={choice.icon}
                  checkedIcon={choice.checkedIcon}
                />
              }
              label={""}
              key={choice.value}
            />
          ))
        ) : (
          <MenuItem disabled={true}>
            <FormattedMessage defaultMessage="No results found" id="hX5PAb" />
          </MenuItem>
        )}
      </RadioGroup>
      {hint && <FormHelperText>{hint}</FormHelperText>}
    </FormControl>
  );
};
ReactionField.displayName = "ReactionField";
export default ReactionField;
