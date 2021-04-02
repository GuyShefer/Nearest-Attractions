import { autocomplete } from 'air-port-codes-node';

const apca = autocomplete({
    key: '1cc5c30c10',
    secret: 'b5c608c6b385dc7 ', // Your API Secret Key: use this if you are not connecting from a web server
    limit: 7
});

export default apca;