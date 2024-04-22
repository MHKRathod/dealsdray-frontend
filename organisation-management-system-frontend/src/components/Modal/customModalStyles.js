const customModalStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Light greyish background color with some transparency
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: 'white', // Set modal background color
        padding: '20px', // Add some padding to content
        borderRadius: '8px', // Add border radius to content
    },
};

export default customModalStyles;