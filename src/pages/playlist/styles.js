import styled, { css } from 'styled-components';
import { Spinner } from '../../components/Loading/styles';

export const Container = styled.div`
  margin-top: 30px;

  ${Spinner} {
    height: 48px;
  }
  ${props => props.loading
    && css`
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    `};
`;

export const Header = styled.header`
  display: flex;
  align-items: center;

  img {
    height: 220px;
    width: 220px;
  }

  div {
    margin-left: 20px;

    span {
      font-size: 11px;
      letter-spacing: 1.11px;
      font-weight: 300;
      text-transform: uppercase;
    }

    h1 {
      margin-top: 10px;
      font-size: 48px;
      text-transform: uppercase;
    }

    p {
      margin-top: 0px;
      color: #b3b3b3;
      font-size: 11px;
      letter-spacing: 1.11px;
      text-transform: uppercase;
    }

    button {
      background: #1db854;
      height: 32px;
      border-radius: 16px;
      color: #fff;
      line-height: 32px;
      padding: 0 35px;
      border: 0;
      margin-top: 10px;
      font-size: 12px;
      letter-spacing: 1.11px;
    }
  }
`;

export const SongList = styled.table`
  width: 100%;
  text-align: left;
  color: #fff;
  margin-top: 20px;

  thead th {
    font-size: 11px;
    color: #b3b3b3;
    letter-spacing: 1.11px;
    font-weight: normal;
    text-transform: uppercase;
    padding: 5px 10px;

    &:last-child {
      text-align: right;
    }
  }

  tbody td {
    border-top: 1px solid #282828;
    font-size: 13px;
    padding: 0 10px;
    line-height: 40px;

    &:first-child {
      width: 80px;
      text-align: right;
    }

    &:last-child {
      text-align: right;
    }
  }

  tbody tr:hover td {
    background: #282828;
  }
`;

export const SongItem = styled.tr`
  td {
    border-top: 1px solid #282828;
    font-size: 13px;
    padding: 0 10px;
    line-height: 40px;

    &:first-child {
      width: 80px;
      text-align: right;
    }
    &:last-child {
      text-align: right;
    }
  }
  background: ${props => (props.selected ? '#282828' : 'transparent')};
  color: ${props => (props.playing ? '#1ED760' : '#FFF')};

  &:hover td {
    background: #282828;
  }
`;