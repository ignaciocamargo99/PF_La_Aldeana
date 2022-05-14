import BeShowed from "common/BeShowed";
import React from "react";
import DescriptionSupply from "views/RegisterSupply/components/DescriptionSupply";
import NameSupply from "views/RegisterSupply/components/NameSupply";
import SinglePrice from "views/RegisterSupply/components/SinglePrice";
import MultiplePrice from "views/RegisterSupply/components/MultiplePrice";
import TypeSupply from "views/RegisterSupply/components/TypeSupply";
import Stock from "views/RegisterSupply/components/Stock";

const DataSupply = ({ load, supply }) => {

    return (
        <>
            <NameSupply load={(childData) => load(childData)} data={supply} />
            <DescriptionSupply load={(childData) => load(childData)} data={supply} />
            <BeShowed show={supply.price_wholesale && supply.reading}>
                <SinglePrice load={(childData) => load(childData)} data={supply} />
            </BeShowed>
            <BeShowed show={supply.price_retail && supply.reading}>
                <MultiplePrice load={(childData) => load(childData)} data={supply} />
            </BeShowed>
            <TypeSupply load={(childData) => load(childData)} data={supply} />


            {/* <Stock load={(childData) => load(childData)} data={supply}/> */}
        </>
    );
}

export default DataSupply;