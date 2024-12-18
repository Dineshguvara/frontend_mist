 import React from "react";
 import { View, FlatList, Text, StyleSheet } from "react-native";
 import SchoolCard from "./SchoolCard"; // Assuming you have a SchoolCard component

 const SchoolList = ({
   searchQuery,
   schools,
   isLoading,
   navigateToSchoolDetail,
 }) => {
   const filteredSchools = schools?.filter((school) =>
     school.name.toLowerCase().includes(searchQuery.toLowerCase())
   );

   if (isLoading) return <Text>Loading...</Text>;
   if (!schools?.length) return <Text>No schools found!</Text>;

   return (
     <FlatList
       data={filteredSchools}
       keyExtractor={(item) => item.id.toString()}
       contentContainerStyle={styles.listContainer}
       numColumns={2}
       renderItem={({ item }) => (
         <SchoolCard
           school={item}
           onPress={() => navigateToSchoolDetail(item.id)}
         />
       )}
     />
   );
 };

 const styles = StyleSheet.create({
   listContainer: {
     paddingHorizontal: 10,
     paddingBottom: 80,
   },
 });

 export default SchoolList;
