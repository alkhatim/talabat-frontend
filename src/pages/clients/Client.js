import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Card,
  Col,
  Container,
  Row,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Button,
  Form,
  Input,
} from "reactstrap";
import Select from "react-select";
import messages from "../../services/messages";
import Breadcrumbs from "../../components/common/Breadcrumb";
import validateClient from "./utils/validateClient";
import OrdersTable from "../orders/components/OrdersTable";
import {
  getClient,
  updateClient,
  createClient,
} from "../../store/actions/clientActions";
import { getClientOrders } from "../../store/actions/orderActions";

const Client = () => {
  const params = useParams();
  const history = useHistory();

  const [client, setClient] = useState({
    _id: "",
    name: "",
    gender: "",
    age: "",
    phone: "",
    phone2: "",
    address: "",
  });
  const [orders, setOrders] = useState([]);

  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleAgeChange = (v) => {
    setClient({ ...client, age: v });
  };

  const handleGenderChange = (v) => {
    setClient({ ...client, gender: v });
  };

  const handleSubmit = async () => {
    let result;
    let payload = {
      ...client,
      _id: client._id || undefined,
    };

    const { error } = validateClient(payload);
    if (error) return messages.error(error.details[0].message);

    if (payload._id) {
      result = await updateClient(params.id, payload);
    } else {
      result = await createClient(payload);
    }
    if (result) {
      messages.success("Saved Successfuly");
      setClient(result);
      history.push("/clients");
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      const [clientData, ordersData] = await Promise.all([
        getClient(params.id),
        getClientOrders(params.id),
      ]);
      if (clientData) setClient(clientData);
      if (ordersData) setOrders(ordersData);
    };
    const fetchOrders = async () => {
      const result = await getClientOrders(location.state.client);
      if (result) setOrders(result);
    };
    if (location.state?.client) {
      setClient(location.state.client);
      fetchOrders();
    } else if (params.id) fetchAll();
  }, []);

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title="Clients" breadcrumbItem="Client" />
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <CardTitle className="mb-5">Client Details</CardTitle>
                <Form>
                  <FormGroup className="row mb-4">
                    <Label for="name" className="col-sm-2 col-form-Label">
                      Name
                    </Label>
                    <Col sm={8}>
                      <Input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={client.name}
                        onChange={handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup className="select2-container">
                    <Label>Gender</Label>
                    <Select
                      id="gender"
                      name="gender"
                      value={client.gender}
                      onChange={handleGenderChange}
                      options={["MALE","FEMALE"]}
                      classNamePrefix="select2-selection"
                    />
                  </FormGroup>
                  <FormGroup className="select2-container">
                    <Label>Age</Label>
                    <Select
                      id="age"
                      name="age"
                      value={client.age}
                      onChange={handleAgeChange}
                      options={["< 18", "19 - 24", "25 - 30", "31 -40", "> 40"]}
                      classNamePrefix="select2-selection"
                    />
                  </FormGroup>
                  <FormGroup className="row mb-4">
                    <Label for="phone" className="col-sm-2 col-form-Label">
                      Phone
                    </Label>
                    <Col sm={8}>
                      <Input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={client.phone}
                        onChange={handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup className="row mb-4">
                    <Label for="phone2" className="col-sm-2 col-form-Label">
                      Second Phone
                    </Label>
                    <Col sm={8}>
                      <Input
                        type="text"
                        className="form-control"
                        id="phone2"
                        name="phone2"
                        value={client.phone2}
                        onChange={handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup className="row mb-4">
                    <Label for="address" className="col-sm-2 col-form-Label">
                      Address
                    </Label>
                    <Col sm={8}>
                      <Input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={client.address}
                        onChange={handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <div className="center">
                    <Button
                      color="success"
                      className="w-md"
                      onClick={handleSubmit}
                    >
                      <i className="bx bx-check-double font-size-16 align-middle mr-2"></i>
                      Confirm
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {client._id && <OrdersTable orders={orders} />}
      </Container>
      {/* container-fluid */}
    </div>
  );
};

export default Client;
