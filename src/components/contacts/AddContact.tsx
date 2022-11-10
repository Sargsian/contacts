import { useRef, useEffect, SyntheticEvent } from 'react';
import ReactDOM from 'react-dom';
import classes from './AddContact.module.scss';
import { onPhoneInput, onBackspace } from '../../utils/phoneMask';
import { useAppDispatch } from '../../hooks/redux';
import { modalState } from '../../store/reducers/modalSlice';

interface AddContactProps {
  createContact: (name: string, phoneNumber: string) => void;
}

const AddContact = (props: AddContactProps) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.addEventListener('keydown', (e) => onBackspace(e));
    nameRef.current?.focus();
    return () => document.removeEventListener('keydown', (e) => onBackspace(e));
  }, []);

  const handleCreate = (e: SyntheticEvent) => {
    e.preventDefault();
    const name = nameRef.current?.value!;
    const phone = phoneRef.current?.value!;
    props.createContact(name, phone);
    dispatch(modalState(false));
  };

  const handleCancel = () => {
    dispatch(modalState(false));
  };

  return (
    <>
      {ReactDOM.createPortal(
        <div className={classes.background} onClick={handleCancel} />,
        document.getElementById('modal-root')!
      )}
        <form className={classes.addContact}>
          <input type='text' placeholder='Имя' ref={nameRef} />
          <input
            type='tel'
            placeholder='Номер'
            onInput={onPhoneInput}
            ref={phoneRef}
            maxLength={18}
          />
          <div>
            <button onClick={handleCreate}>Добавить</button>
            <button onClick={handleCancel}>Отмена</button>
          </div>
        </form>
    </>
  );
};

export default AddContact;
