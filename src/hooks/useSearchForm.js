// useSearchForm.js
/**

 * @returns {Object} 
 */

import {useEffect, useState} from 'react'; 
import {useNavigate} from 'react-router-dom';
import {useAuth} from './AuthContext'; 


export const useSearchForm = () => {
 
  const [companyINN, setCompanyINN] = useState('');
  const [tonality, setTonality] = useState('Любая');
  const [documentCount, setDocumentCount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState({
    maxCompleteness: false,
    businessMentions: false,
    mainRole: false,
    riskFactorsOnly: false,
    includeMarketNews: true,
    includeAnnouncements: true,
    includeNewsSummaries: true,
  });

 
  const { isLoggedIn } = useAuth();
 
  const navigate = useNavigate();

  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth');
    }
  }, [isLoggedIn, navigate]);

 
  const [isFormValid, setIsFormValid] = useState(false);

  
  useEffect(() => {
    
    const isValid = companyINN && documentCount && startDate && endDate;
   
    setIsFormValid(isValid);
  }, [companyINN, documentCount, startDate, endDate, checkboxStates]);

  
  const handleCheckboxChange = (event) => {
    
    const { name, checked } = event.target;
    setCheckboxStates(prevState => ({
      ...prevState,
     
      [name]: checked,
    }));
  };


  return {
    companyINN,
    setCompanyINN,
    tonality,
    setTonality,
    documentCount,
    setDocumentCount,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    checkboxStates,
    setCheckboxStates,
    handleCheckboxChange,
    isFormValid,
    navigate,
     submitted,        
  setSubmitted
  };
};
