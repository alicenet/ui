import React from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
    useTheme
} from "@mui/material";
import { Close } from "@mui/icons-material";

export const HelpDialog = ({ open, handleClose }) => {

    const theme = useTheme();

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="help-dialog-title"
            aria-describedby="help-dialog-description"
            PaperProps={{
                sx: {
                    paddingTop: 0.5,
                    borderTop: 2,
                    borderRadius: 0,
                    borderColor: theme.palette.secondary.main,
                    backgroundColor: theme.palette.background.default
                }
            }}
        >

            <DialogTitle
                id="help-dialog-title"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >

                <Typography variant="span" fontSize="larger">Are you ready to play?</Typography>

                <IconButton onClick={handleClose}>

                    <Close />

                </IconButton>

            </DialogTitle>

            <DialogContent>

                <Box>

                    <Typography textAlign="justify">
                        Tic-tac-toe, noughts and crosses, or Xs and Os is a paper-and-pencil game for two players who
                        take
                        turns marking the spaces in a three-by-three grid with X or O. The player who succeeds in
                        placing
                        three of their marks in a horizontal, vertical, or diagonal row is the winner. It is a solved
                        game,
                        with a forced draw assuming best play from both players.
                    </Typography>

                    <Typography variant={"h6"} paddingTop={2} paddingBottom={1} sx={{ textDecoration: "underline" }}>
                        The Purpose
                    </Typography>

                    <Typography textAlign="justify">
                        This application serves as a proof of concept for writing and examine state channels on chain
                        utilizing AliceNet DataStores. The game is written to an index on the chain with a value
                        representing the current state of the game as follows:
                    </Typography>

                    <br />

                    <Typography textAlign="justify">
                        The board is an array of 9 length where representation is follows:
                    </Typography>

                    <span>0 | 1 | 2</span><br /><span>3 | 4 | 5</span><br /><span>6 | 7 | 8</span><br /><br />

                    <Typography textAlign="justify">
                        A string of length 9 can be used to determine the board state, and two additional slots can be
                        used
                        to track current turn and how many turns have passed.
                    </Typography>

                    <Typography textAlign="justify">
                        A string of the following structure can be used to serialize state: abccccccccc.
                    </Typography>

                    <Typography textAlign="justify">
                        Where <strong>A</strong> is the turn count, <strong>B</strong> is the current turn,
                        and <strong>C</strong> is the space state which will be 0, 1, or 2 representing empty, X, and O
                        respectively for each space.
                    </Typography>

                    <br />

                    <Typography textAlign="justify">
                        Take the following example board:
                    </Typography>

                    <span>&nbsp;X | _ | _</span><br /><span>&nbsp;_ | _ | _</span><br /><span>&nbsp;_ | _ | _</span><br /><br />

                    <Typography textAlign="justify">
                        We can now serialize this as string &#8220;12100000000&#8221; and write it into a DataStore
                        as &#8220;0x3132313030303030303030&#8221;.
                    </Typography>

                    <Typography variant={"h6"} paddingTop={2} paddingBottom={1} sx={{ textDecoration: "underline" }}>
                        Why?
                    </Typography>

                    <Typography textAlign="justify">
                        The surface level observation of storing Tic-tac-toe is quite silly, however being able to prove
                        the
                        existence of other data can be useful for various applications such as validation and proof.
                    </Typography>

                    <Typography textAlign="justify">
                        Using additional tools in the AliceNet framework you can prove this game took place with its
                        specific outcome in the future if you so desire.
                    </Typography>

                    <Typography textAlign="justify">
                        Referencing the above Tic-tac-toe example, an entire game could take place on chain, each turn
                        being
                        written to the DataStore. The state of that DataStore is verifiable through each mutation by
                        checking the merkle proofs for each block the expected state is on. An accusation of game state
                        could be formed against individual turns or the outcome itself.
                    </Typography>

                </Box>

                <DialogActions sx={{ paddingTop: 2 }}>
                    <Button variant="contained" color="secondary" onClick={handleClose} size="large">
                        Close
                    </Button>
                </DialogActions>

            </DialogContent>

        </Dialog>

    );
}


