import { Component } from "react";
import { ContactsForm } from "../ContactsForm/ContactsForm";
import { ContactList } from "../ContactList/ContactList";
import { Filter } from "../Filter/Filter";
import { Container } from "./App.styled";
import shortid from "shortid";

export class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };
  addContact = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };
  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    if (contacts.length) {
      return contacts.filter((contact) =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
    }
  };
  changeFilter = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);
    this.setState({ contacts: parsedContacts });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const visibleContacts = this.getVisibleContacts();
    const { contacts } = this.state;
    return (
      <Container>
        <ContactsForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        {contacts.length > 1 && <Filter onChange={this.changeFilter} />}
        {contacts.length ? (
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        ) : (
          <p>There are no contacts here</p>
        )}
      </Container>
    );
  }
}
