import styled from 'styled-components';

export const Container = styled.div`
  height: 42px;
  line-height: 42px;
  padding: 0 20px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 13px;
  background: ${props => (props.type === 'danger' ? '#F55A5A' : '#D4D445')};
  margin: 20px 0 10px;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    border: 0;
    background: transparent;
    img {
      height: 14px;
    }
  }
`;
