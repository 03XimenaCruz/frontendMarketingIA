import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const getDataFrame = async () => {
  const response = await axios.get(`${API_URL}/api/data/dataframe`);
  return response.data;
};

export const getClusters = async () => {
  const response = await axios.get(`${API_URL}/api/data/clusters`);
  return response.data;
};

export const getPCA = async () => {
  const response = await axios.get(`${API_URL}/api/data/pca`);
  return response.data;
};

export const getSalesTrend = async () => {
  const response = await axios.get(`${API_URL}/api/visualizations/sales-trend`);
  return response.data;
};

export const getCountryBar = async () => {
  const response = await axios.get(`${API_URL}/api/visualizations/country-bar`);
  return response.data;
};

export const getHistograms = async (column) => {
  const response = await axios.get(`${API_URL}/api/visualizations/histograms/${column}`);
  return response.data;
};

export const getCorrelationHeatmap = async () => {
  const response = await axios.get(`${API_URL}/api/visualizations/correlation-heatmap`);
  return response.data;
};

export const getPCAScatter = async () => {
  const response = await axios.get(`${API_URL}/api/visualizations/pca-scatter`);
  return response.data;
};