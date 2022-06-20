import { useQuery } from 'react-query';
import axios from 'axios';
import { nowRequestFormatter } from '../components/nowFormatter'

export const useAGPTData = (onSuccess, onError, token, dateFrom, country, generationType) => {

    const fetchAGPT = () => {
        return axios.get(`https://saas-22-18-agpt-data-mgmt.herokuapp.com/getData/${country}/${generationType}/${dateFrom}/${nowRequestFormatter()}`, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
    }

    return useQuery(['agpt-get', country, dateFrom, generationType], fetchAGPT, {
        enabled: false,
        onSuccess: onSuccess("agpt"),
        onError: onError("agpt"),
        select: (data) => data.data.data.map((row) => [row.timestamp, parseFloat(row.value)])
      })
  }