import { useUser } from "@dashboard/auth";
import { DashboardCard } from "@dashboard/components/Card";
import { DateTime } from "@dashboard/components/Date";
import ReactionField from "@dashboard/components/ReactionField";
import { UserAvatar } from "@dashboard/components/UserAvatar";
import { useCustomerDetails } from "@dashboard/customers/hooks/useCustomerDetails";
import { useUpdateCustomerNotesMutation } from "@dashboard/graphql";
import useNotifier from "@dashboard/hooks/useNotifier";
import { commonMessages } from "@dashboard/intl";
import { getUserInitials } from "@dashboard/misc";
import { Button, TextField } from "@material-ui/core";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import { makeStyles } from "@saleor/macaw-ui";
import { Box, Text, vars } from "@saleor/macaw-ui-next";
import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";

type Note = {
  date: string;
  message: string | null;
  reaction?: string | null;
  url?: string | null;
  files?: string[] | null;
  user?: {
    email: string;
  };
  adminUser?: {
    email: string;
  };
};

const useStyles = makeStyles(
  theme => ({
    button: {
      padding: `7px`,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    input: {
      "& > div": {
        padding: "0 0 0 14px",
      },
      "& textarea": {
        "&::placeholder": {
          opacity: [[1], "!important"] as any,
        },
      },
      background: vars.colors.background.default1,
    },
    noteInputWrapper: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      position: "relative",
      marginBottom: theme.spacing(3),
    },
    notesItemsWrapper: {
      display: "flex",
      flexDirection: "column",
      paddingLeft: 10,
      gap: 10,
      marginBottom: theme.spacing(3),
    },
    reaction: {
      top: -8,
    },
  }),
  { name: "CustomerNotes" },
);

interface CustomerNotesProps {
  props: any;
}

function getReaction(reaction: string) {
  if (reaction === "satisfied") {
    return <SentimentSatisfiedAltIcon htmlColor="#61D174" />;
  }

  if (reaction === "neutral") {
    return <SentimentSatisfiedIcon htmlColor="#415058" />;
  }

  if (reaction === "dissatisfied") {
    return <SentimentVeryDissatisfiedIcon htmlColor="#E23645" />;
  }
}

// Notes List Component
// eslint-disable-next-line react/display-name
const NotesList = React.memo(({ notes }: { notes: Note[] }) => {
  return (
    <>
      {notes?.map((note, index) => (
        <Box
          key={index}
          display="flex"
          justifyContent="flex-start"
          alignItems="flex-start"
          position="relative"
          width="100%"
          gap={4}
          __paddingLeft="30px"
        >
          <Box
            as="span"
            position="absolute"
            backgroundColor="default1Pressed"
            borderRadius="100%"
            __height="7px"
            __width="7px"
            __marginTop="7px"
            __left="0"
          />
          {getReaction(note.reaction)}
          <Text size={3} color="default1">
            {note.message}
          </Text>
          <Box display="flex" alignItems="center" gap={5} marginLeft="auto">
            <Text size={3} color="default2" whiteSpace="nowrap">
              <DateTime date={note.date} plain={false} />
            </Text>
          </Box>
        </Box>
      ))}
    </>
  );
});

const CustomerNotes: React.FC<CustomerNotesProps> = ({ props }) => {
  const classes = useStyles(props);
  const intl = useIntl();
  const notify = useNotifier();
  const { user } = useUser();
  const customerDetails = useCustomerDetails();
  const customer = customerDetails?.customer?.user;
  const [message, setMessage] = React.useState<string>();
  const [reaction, setReaction] = React.useState<string>();
  const [notes, setNotes] = React.useState<Note[]>();

  useEffect(() => {
    try {
      if (customerDetails?.customer?.user?.note) {
        setNotes(JSON.parse(customerDetails?.customer?.user?.note));
      }
    } catch {
      setNotes([]);
    }
  }, [customerDetails?.customer?.user?.note]);

  const [updateCustomerNotes] = useUpdateCustomerNotesMutation({
    onCompleted: data => {
      if (data.customerUpdate.errors.length === 0) {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges),
        });
      }
    },
  });

  const handleAddNote = () => {
    if (!message || message.trim() === "") {
      notify({
        status: "error",
        text: intl.formatMessage({
          id: "uDTlGz",
          defaultMessage: "Note message cannot be empty.",
        }),
      });

      return;
    }

    const updatedNotes = [
      ...notes,
      { date: new Date().toISOString(), message: message.trim(), reaction },
    ];

    setNotes(updatedNotes);
    updateCustomerNotes({
      variables: {
        id: customer.id,
        note: JSON.stringify(updatedNotes),
      },
    });
    setMessage("");
  };

  const sortedNotes = React.useMemo(
    () => notes?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [notes],
  );

  const onChange = (event: React.ChangeEvent<any>) => {
    const { value } = event.target;

    setMessage(value);
    setReaction(event.target.name === "reaction" ? value : reaction);
  };

  const handleReactionChange = (event: React.ChangeEvent<any>) => {
    setReaction(event.target.value);
  };

  return (
    <DashboardCard>
      <DashboardCard.Header>
        <DashboardCard.Title>
          {intl.formatMessage({
            id: "6R1WfR",
            defaultMessage: "Notes",
            description: "section header",
          })}
        </DashboardCard.Title>
      </DashboardCard.Header>

      <DashboardCard.Content>
        <div className={classes.noteInputWrapper}>
          <UserAvatar url={user?.avatar?.url} initials={getUserInitials(user)} />
          <TextField
            className={classes.input}
            placeholder={intl.formatMessage({
              id: "3evXPj",
              defaultMessage: "Leave your note here...",
            })}
            onChange={onChange}
            value={message}
            name="message"
            fullWidth
            multiline
            InputProps={{
              endAdornment: (
                <>
                  <ReactionField
                    disabled={false}
                    name="reaction"
                    value={reaction}
                    onChange={handleReactionChange}
                    className={classes.reaction}
                  />
                  <Button className={classes.button} onClick={handleAddNote}>
                    <FormattedMessage
                      id="v/1VA6"
                      defaultMessage="Send"
                      description="add order note, button"
                    />
                  </Button>
                </>
              ),
            }}
            variant="outlined"
          />
        </div>
        <div className={classes.notesItemsWrapper}>
          <NotesList notes={sortedNotes} />
        </div>
      </DashboardCard.Content>
    </DashboardCard>
  );
};

CustomerNotes.displayName = "CustomerNotes";

export default CustomerNotes;
