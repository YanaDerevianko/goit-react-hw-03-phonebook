import propTypes from "prop-types";
import React from "react";
import { Component } from "react";
import shortid from "shortid";
import { AddForm, ContactsInput, ContactsButton } from "./ContactsForm.styled";

export class ContactsForm extends Component {
  state = {
    name: "",
    number: "",
  };

  nameInputId = shortid.generate();
  numberInputId = shortid.generate();

  handleChange = (event) => {
    const { name, number, value } = event.currentTarget;
    this.setState({ [name]: value, [number]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };
  reset = () => {
    this.setState({ name: "", number: "" });
  };
  render() {
    return (
      <>
        <h1>Phonebook</h1>
        <AddForm onSubmit={this.handleSubmit}>
          <label>
            Name:
            <ContactsInput
              id={this.nameInputId}
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              required
            />
          </label>
          <label>
            Number:
            <ContactsInput
              id={this.numberInputId}
              type="tel"
              name="number"
              value={this.state.number}
              onChange={this.handleChange}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять из цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              required
            />
          </label>
          <ContactsButton type="submit">Add contact</ContactsButton>
        </AddForm>
      </>
    );
  }
}
ContactsForm.propTypes = {
  addContact: propTypes.func.isRequired,
};
