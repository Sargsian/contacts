import classes from './Contact.module.scss';
import { IContact } from '../../models/IContact';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { onPhoneInput, onBackspace } from '../../utils/phoneMask';

interface ContactInterface {
  contact: IContact;
  update: (contact: IContact) => void;
  remove: (contact: IContact) => void;
}

const Contact = ({ contact, update, remove }: ContactInterface) => {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [editData, setEditData] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editData) {
      nameRef.current!.value = contact.name;
      phoneRef.current!.value = contact.phoneNumber;
      phoneRef.current?.focus();
    }
  }, [editData, contact.name, contact.phoneNumber]);

  useEffect(() => {
    document.addEventListener('keydown', (e) => onBackspace(e));
    nameRef.current?.focus();
    return () => document.removeEventListener('keydown', (e) => onBackspace(e));
  }, []);

  const handleDivVisibility = () => {
    imageContainerRef.current!.style.visibility = 'visible';
  };

  const handleRemove = (event: MouseEvent) => {
    event.stopPropagation();
    remove(contact);
  };
  const handleUpdate = (event: MouseEvent) => {
    event.preventDefault();
    let name = nameRef.current!.value;
    let phoneNumber = phoneRef.current!.value;
    let formattedPhone = phoneNumber.replace(/\D/g, '');
    if (
      formattedPhone.length !== 11 ||
      formattedPhone.substring(0, 3) === '+7'
    ) {
      phoneNumber = phoneNumber.replace(/\D/g, '');
    }
    update({ ...contact, name, phoneNumber });
    setEditData(false);
  };

  const editDataHandler = (editState: boolean) => {
    setEditData(editState);
  };

  return (
    <div className={classes.contact}>
      <div className={classes.user}>
        <div className={classes.skeleton}>
          <div
            ref={imageContainerRef}
            style={{ visibility: 'hidden' }}
            className={classes.userLogo}
          >
            <img
              onLoad={handleDivVisibility}
              src='/assets/images/circle-user-solid.svg'
              alt='logo'
            />
          </div>
        </div>
        <div className={classes.userDetails}>
          {!editData ? (
            <>
              <p>{contact.name}</p>
              <p>{contact.phoneNumber}</p>
            </>
          ) : (
            <form id='updateContact'>
              <input type='text' ref={nameRef} />
              <input type='tel' ref={phoneRef} onInput={onPhoneInput} />
            </form>
          )}
          <p className={classes.addTime}>{`Добав. ${contact.date}`}</p>
        </div>
        {!editData && (
          <button onClick={() => editDataHandler(true)}>Изменить</button>
        )}
        {editData && (
          <button type='submit' form='updateContact' onClick={handleUpdate}>
            Потвердить
          </button>
        )}
      </div>
      {!editData && <button onClick={handleRemove}>Удалить</button>}
      {editData && (
        <button onClick={() => editDataHandler(false)}>Отмена</button>
      )}
    </div>
  );
};

export default Contact;
