import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import styles from './App.module.scss';

import contacstList from './data/contactsList';

class App extends Component {
  state = {
    contacts: contacstList,
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = data => {
    const auditName = this.state.contacts.find(
      e => e.name.toLowerCase() === data.name.toLowerCase()
    );
    if (auditName) return alert(auditName.name + ' is already in contacts.');

    data.id = nanoid();
    this.setState(prevState => ({ contacts: [data, ...prevState.contacts] }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContact = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContact = this.getVisibleContact();
    const isContact = Boolean(visibleContact.length);

    return (
      <div className={styles.container}>
        <div className={styles.containerBcg}>
          <div className={styles.contactBook}>
            <h1 className={styles.title}>Phonebook</h1>
            <ContactForm onSubmit={this.addContact} />
            <h2 className={styles.subTitle}>Contacts</h2>
            <Filter value={filter} changeFilter={this.changeFilter} />
            {isContact && (
              <ContactList
                contact={visibleContact}
                deleteContact={this.deleteContact}
              />
            )}
            {!isContact && (
              <p className={styles.noContact}>No contact in list</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
