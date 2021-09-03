import React from 'react';
import { useDispatch } from 'react-redux';
import { FetchedData } from '../../lib/tsDefinitions';
import { addFetchedDataToFile } from '../../redux/actions/fileActionsCreator';
import BaseModal from '../BaseModal/BaseModal';

import styles from './SelectedCorrectContentFromList.module.scss';

interface SelectedCorrectContentFromListProps {
  show: boolean;
  setShow: () => void;
  fetchResults: FetchedData[];
}

const SelectedCorrectContentFromList: React.FC<SelectedCorrectContentFromListProps> = ({
  show,
  setShow,
  fetchResults,
}) => {
  const dispatch = useDispatch();
  const handleSelect = (fetchResult: FetchedData) => {
    dispatch(addFetchedDataToFile(fetchResult));
  };

  return (
    <BaseModal show={show} setShow={setShow}>
      <div className={styles.inner}>
        <h3>Select One:</h3>
        <ul>
          {fetchResults.map((fr: FetchedData) => (
            <button onClick={() => handleSelect(fr)} type="button" key={fr.id}>
              <li>
                {fr.posterPath ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${fr.posterPath}`}
                    alt={fr.title}
                  />
                ) : (
                  <div className={styles.noImage} />
                )}
                <div>
                  <h5>{fr.title}</h5>
                  <span>{fr.year}</span>
                </div>
              </li>
            </button>
          ))}
        </ul>
      </div>
    </BaseModal>
  );
};

export default SelectedCorrectContentFromList;
