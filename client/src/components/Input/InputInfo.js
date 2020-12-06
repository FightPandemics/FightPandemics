import styled from 'styled-components';

import InputError from "./InputError";

import { theme } from "constants/theme";

const InputInfo = styled(InputError)`
    color: ${props => props.error ? theme.colors.red : theme.colors.darkerGray}
`;

export default InputInfo;