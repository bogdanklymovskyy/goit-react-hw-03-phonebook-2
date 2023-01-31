import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import styles from './ContactList.module.scss';

const ContactList = ({ contact, deleteContact }) => {
  return (
    <div className={styles.contactListContaoner}>
      <ul className={styles.contactList}>
        {contact.map(({ id, name, number }) => (
          <li key={id} className={styles.contactItem}>
            {name}: {number}
            <IconButton aria-label="delete" onClick={() => deleteContact(id)}>
              <DeleteIcon sx={{ fill: '#dd2c00' }} />
            </IconButton>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};
