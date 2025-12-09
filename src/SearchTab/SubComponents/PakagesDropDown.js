import React, { useEffect, useState } from "react";
import axios from "axios";
import Config from "../../Config/Config";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

const PackagesDrop = ({ setPackagesValues, handleFormatted }) => {

    const [PackagesDB, setPackagesDB] = useState([]);
    const LocalPackages = JSON.parse(localStorage.getItem('cab_listing')) || {};
    const [packagesValues, setPackage] = useState(LocalPackages.package);
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;
    const [inputValue, setInputValue] = useState(LocalPackages.package || '');
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        setSelectedOption(LocalPackages.package ? { package_name: LocalPackages.package } : null);
    }, [LocalPackages.package]);

    const handleInputChange = (event, value) => {
        setInputValue(value);
    };

    const handleOptionClick = (event, value) => {
        if (!value) {
            setSelectedOption(null);
            setPackagesValues({ 'package': '', 'package_id': '' });
            handleFormatted({ 'package': '', 'package_id': '' });
            return;
        }
        setSelectedOption(value);
        setPackagesValues({ 'package': value.package_name, 'package_id': value._id });
        handleFormatted({ 'package': value.package_name, 'package_id': value._id });
    };

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // For demo purposes.
            if (active) {
                setOptions([...PackagesDB]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    const GetThePackagesAPIDate = () => {
        axios.get(`${Config.API_URL}/api/customer/packagelist`, {
            headers: {
                'Authorization': `${Config.API_ACCESS_TOKEN}`
            }
        })
            .then((response) => {
                if (response.data.status) {
                    setPackagesDB(response.data.data);
                } else {
                    setPackagesDB([]);
                }
            })
            .catch(err => {
                setPackagesDB([]);
            });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            GetThePackagesAPIDate();
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Autocomplete
            id="asynchronous-demo"
            style={{ backgroundColor: "#E0EBFF" }}
            size="small"
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            value={selectedOption}
            getOptionLabel={(option) => option.package_name || ''}
            options={options}
            loading={loading}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            onChange={(event, value) => handleOptionClick(event, value)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder="Packages List"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    );
};

export default PackagesDrop;
