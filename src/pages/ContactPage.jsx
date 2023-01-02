import { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { ContactFilter } from "../components/ContactFilter";
import { ContactList } from "../components/ContactList";

import { loadContacts, setFilterBy } from "../store/actions/contactActions";

import plusButton from "../assets/images/buttons/plus.png";

export class _ContactPage extends Component {
  componentDidMount() {
    this.props.loadContacts();
  }

  onChangeFilter = async (filterBy) => {
    await this.props.setFilterBy(filterBy);
    this.props.loadContacts();
  };

  render() {
    const { contacts } = this.props;
    if (!contacts) return <div>Loading...</div>;
    if (!contacts.length) return <div>No contacts found</div>;
    return (
      <main>
        <ContactFilter onChangeFilter={this.onChangeFilter} filterBy={this.props.filterBy} />
          <ContactList contacts={contacts} />
          <Link className="add-btn" to="/contact/edit/">
            <img src={plusButton} alt="" />
          </Link>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contactModule.contacts,
    filterBy: state.contactModule.filterBy,
  };
};

const mapDispatchToProps = {
  loadContacts,
  setFilterBy,
};

export const ContactPage = connect(mapStateToProps, mapDispatchToProps)(_ContactPage);
