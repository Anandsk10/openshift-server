import React from "react";
import { useStyles } from "../../BodyStyles";
import { useEffect, useState } from "react";
import {Button,Card,CardActions,CardContent,Container,Dialog} from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import "../../../../css/servers.css";
import api from "../../../../utils/api";
import moment from "moment/moment";

export const UserCommentsComponent =(props)=>{
    const classes = useStyles();
    const [chatID, setChatID] = useState();
    const [sendmesssage, setsendmessage] = useState("");
    const [chatindex, setchatindex] = useState();
    const [userid, setuserid] = useState([]);
    const [name, setName] = useState([]);
    const [dear, setDear] = useState([]);

    useEffect(()=>{
      infraChat(props.chatID,props.chatindex)
    },[])

    const infraChat = async (s, i) => {
      setchatindex(i);
      setChatID(s);
      setuserid(props.output.User_No);
      setName(props.output.Requester);
      let postData = {
        Id: s,
      };
      const data = await api.post("chat", postData);
      const newarr = data?.data?.Chat[0]?.Comment.map((itm) => {
        if (itm[0] == props.output?.User_No) {
          return {
            user: "user",
            comment: itm,
          };
        } else {
          return {
            user: "admin",
            comment: itm,
          };
        }
      });
      setDear(newarr);
    };

    const senddatafunction = async () => {
      let postData = {
        Id: chatID,
      };
  
      const data = await api.post("chat", postData);
      const postfer = {
        Id: chatID,
        Chat:
          (data?.data?.Chat[0]?.Comment.toString() &&
            data?.data?.Chat[0]?.Comment.toString() + ",") +
          +userid +
          "," +
          sendmesssage +
          "," +
          name,
      };
      const res = JSON.stringify(postfer);
      const tgr = await api.post("update_u_comments", res);
      if (tgr) {
        infraChat(chatID, chatindex);
        setsendmessage("");
      }
    };

    return (
        <>
        <Dialog open={true} className={classes.dialog}>
        <Container
          component="main"
          className={classes.dialogplatformContainer}
          style={{ alignContent: "center" }}
        >
          <Stack direction="row" spacing={12}>
            <Typography component="h1" variant="h6" class="mt-2" align="center">
              {props.title}
            </Typography>
            <Button
            id="regresh chat btn"
              style={{ top: 5 }}
              onClick={() => infraChat(chatID, chatindex)}
            >
              Refresh
            </Button>
          </Stack>
          <div class="platformData mt-4">
            <div>
              <Container>
                <Card sx={{ minWidth: 300 }}>
                  <CardContent>
                    {dear[0]?.comment.length === 1 ? (
                      <h2
                        style={{
                          alignContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          alignSelf: "center",
                          marginTop: 8,
                        }}
                      >
                        No Chat Found
                      </h2>
                    ) : (
                      dear?.map((items, i) => {
                        return (
                          <div flexDirection={"row"}>
                            <Typography>
                              {items?.user === "admin" ? (
                                <div>
                                  <div
                                    style={{
                                      backgroundColor: "#007FEF",
                                      display: "inline-block",
                                      overflow: "hidden",
                                      marginTop: 20,
                                      marginInlineEnd: 120,
                                      marginLeft: 10,
                                      borderRadius: 10,
                                    }}
                                  >
                                    <h3
                                      style={{
                                        marginLeft: 20,
                                        marginRight: 20,
                                        marginTop: 9,
                                        alignContent: "center",
                                        alignItems: "center",
                                        textAlign: "center",
                                        alignSelf: "center",
                                        fontSize: 16,
                                        color: "#fff",
                                        flexWrap: "wrap",
                                        wordBreak: "break-all",
                                      }}
                                    >
                                      {items?.comment[1]
                                        ? items?.comment[1]
                                        : ""}
                                    </h3>
                                  </div>

                                  <div
                                    style={{
                                      marginTop: 0,
                                      marginLeft: 15,
                                      color: "#666",
                                      fontSize: 12,
                                    }}
                                  >
                                    <strong>{items?.comment[2]}</strong>{" "}
                                    {items?.comment[3]
                                      ? moment(items?.comment[3]).format(
                                          "MMMM Do YYYY, h:mm a"
                                        )
                                      : ""}
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  <div
                                    style={{
                                      alignContent: "flex-end",
                                      alignItems: "flex-end",
                                      alignSelf: "flex-end",
                                      marginRight: 0,
                                      backgroundColor: "#F5F7F9",
                                      fontSize: 16,
                                      overflow: "hidden",
                                      marginTop: 20,
                                      marginLeft: 300,
                                      borderRadius: 10,
                                    }}
                                  >
                                    <h3
                                      style={{
                                        alignContent: "center",
                                        alignItems: "center",
                                        textAlign: "center",
                                        alignSelf: "center",
                                        marginLeft: 20,
                                        marginRight: 20,
                                        marginTop: 8,
                                        alignContent: "center",
                                      }}
                                    >
                                      {items?.comment[1]
                                        ? items?.comment[1]
                                        : ""}
                                    </h3>
                                  </div>

                                  <div
                                    style={{
                                      marginTop: 10,
                                      marginLeft: 248,
                                      color: "#666",
                                      fontSize: 12,
                                    }}
                                  >
                                    <strong> {items?.comment[2]}</strong>{" "}
                                    {items?.comment[3]
                                      ? moment(items?.comment[3]).format(
                                          "MMMM Do YYYY, h:mm a"
                                        )
                                      : ""}
                                  </div>
                                </div>
                              )}
                            </Typography>
                          </div>
                        );
                      })
                    )}
                  </CardContent>
                  <CardActions></CardActions>
                </Card>
              </Container>
            </div>
          </div>
          <div
            style={{
              flexDirection: "row",
              marginTop: 20,
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
              marginLeft: 55,
            }}
          >
            <TextField
            id="send msg"
              variant="outlined"
              style={{ width: 360 }}
              size="medium"
              onChange={(e) => {
                setsendmessage(e?.target?.value);
              }}
              focused
              type="text"
              value={sendmesssage}
              placeholder="Type anything…"
            />

            <Button
            id="submit chat btn"
              sx={{ width: "32ch" }}
              variant="contained"
              color="primary"
              className={classes.add}
              style={{ marginLeft: 12, top: -18 }}
              disabled={sendmesssage.length == 0 ? true : false}
              onClick={() => {
                senddatafunction();
              }}
            >
              Send
            </Button>
            {/* </Box> */}
          </div>
          <div
            style={{
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Button
            id="close chat btn "
              sx={{ width: "25ch" }}
              variant="contained"
              color="primary"
              className={classes.add}
              onClick={()=>props.handleUserCommentsModelClose()}
              style={{ justifyContent: "center" }}
            >
              Close
            </Button>
          </div>
        </Container>
      </Dialog>
        </>
    )
}