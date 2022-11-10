import { contactAPI } from '../../services/ContactService';
import Contact from './Contact';
import { IContact } from '../../models/IContact';
import PageLoadAnimation from '../layout/PageLoadAnimation';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { modalState } from '../../store/reducers/modalSlice';
import AddContact from './AddContact';

import classes from './Contacts.module.scss';

const Contacts = () => {
  const [updateContact, {}] = contactAPI.useUpdateContactMutation();
  const [removeContact, {}] = contactAPI.useRemoveContactMutation();
  const email = useAppSelector((state) => state.auth.email)!;
  const modalIsActive = useAppSelector((state) => state.modal.contactModal);
  const keyStroke = useAppSelector((state) => state.search.keystroke);
  const dispatch = useAppDispatch();
  const [createContact] = contactAPI.useCreateContactMutation();
  const { data, isLoading, error } = contactAPI.useFetchAllContactsQuery({
    limit: 10,
    email: email,
  });

  const handleCreate = async (name: string, phoneNumber: string) => {
    const contactDate = new Date();
    const date = contactDate.toLocaleDateString();
    const time = contactDate.toLocaleTimeString();
    const formattedTime = contactDate
      .toLocaleTimeString()
      .substring(0, time.length - 3);
    const addDate = `${date}, ${formattedTime}`;

    await createContact({
      name: name,
      phoneNumber: phoneNumber,
      author: email,
      date: addDate,
    });
  };

  const filteredContacts = data?.filter((user) => {
    return user.name.toLocaleLowerCase().includes(keyStroke);
  });

  const handleRemove = (contact: IContact) => {
    removeContact({ contact, email });
  };
  const handleUpdate = (contact: IContact) => {
    updateContact({ contact, email });
  };

  return isLoading ? (
    <PageLoadAnimation />
  ) : error ? (
    <h1>Произошла ошибка</h1>
  ) : (
    <div className={classes.contactsWrapper}>
      <div className={classes.contacts}>
        {filteredContacts?.map((contact) => (
          <Contact
            remove={handleRemove}
            update={handleUpdate}
            key={contact.id}
            contact={contact}
          />
        ))}
        <button
          className={classes.addButton}
          onClick={() => dispatch(modalState(true))}
        ></button>
      </div>
      {modalIsActive && <AddContact createContact={handleCreate} />}
    </div>
  );
};

export default Contacts;
