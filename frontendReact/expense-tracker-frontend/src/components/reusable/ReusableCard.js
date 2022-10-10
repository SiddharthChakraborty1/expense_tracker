import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Col, Container, Row } from "react-bootstrap";
import { InputLabel, MenuItem, Select } from "@mui/material";


const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function ReusableCard(props) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Container>
            <Row>
                <Col>
                <InputLabel>Category</InputLabel>
                    <Select
                    id="category-select"
                    value = {props.selectedCategory}
                    label="Category"
                    >
                        {props?.categories?.map((element)=>{
                            return (
                              <MenuItem value={element?.id}>
                                {element?.name}
                              </MenuItem>
                            );
                        })}
                    </Select>
                </Col>
            </Row>
        </Container>

      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
