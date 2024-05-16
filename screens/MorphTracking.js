import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    Button,
    Modal,
    TouchableOpacity,
    Switch,
} from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView,ScrollView,Platform } from "react-native";
import Svg, {
    Line,
} from 'react-native-svg';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { Firebase_app } from '../firebase';

export default class MorphTracking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rootMorph:'',
            fatherMorph: '',
            fatherDOB: '',
            motherMorph: '',
            motherDOB: '',
            grandfatherMorph: '',
            grandfatherDOB: '',
            grandmotherMorph: '',
            grandmotherDOB: '',
            fatherGrandmotherMorph: '',
            fatherGrandmotherDOB: '',
            motherGrandfatherMorph: '',
            motherGrandfatherDOB: '',
            MorphTracking: null,
            showFamilyTree: false,
            includeGrandparents: false,
            includeGreatGrandparents: false,
            includeGreatGreatGrandparents: false,
            fatherGreatGrandfatherMorph: '',
            fatherGreatGrandfatherDOB: '',
            fatherGreatGrandmotherMorph: '',
            fatherGreatGrandmotherDOB: '',
            motherGreatGrandfatherMorph: '',
            motherGreatGrandfatherDOB: '',
            motherGreatGrandmotherMorph: '',
            motherGreatGrandmotherDOB: '',
            fatherGreatGreatGrandfatherMorph: '',
        fatherGreatGreatGrandfatherDOB: '',
        fatherGreatGreatGrandmotherMorph: '',
        fatherGreatGreatGrandmotherDOB: '',
        motherGreatGreatGrandfatherMorph: '',
        motherGreatGreatGrandfatherDOB: '',
        motherGreatGreatGrandmotherMorph: '',
        motherGreatGreatGrandmotherDOB: '',
        };
    }

    hasChildren(member) {
        return member.children && member.children.length;
    }

    renderTree(data, level) {
        return (
            
            <FlatList
                data={data}
                horizontal={true}
                contentContainerStyle={{ padding: 50 }}
                keyExtractor={(item, index) => `${item.Morph}-${item.relationship}`}
                listKey={(item, index) => `${item.Morph}-${item.relationship}`}
                initialScrollIndex={0}
                renderItem={({ item, index }) => {
                    const { Morph, dob, relationship } = item;
                    return (
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingLeft: this.props.siblingGap / 2,
                                paddingRight: this.props.siblingGap / 2
                            }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <View style={{
                                    ...this.props.nodeStyle
                                }}>
                                    <Text style={{ ...this.props.nodeTitleStyle, color: this.props.nodeTitleColor }}>{relationship}: {Morph} ({dob})</Text>
                                </View>
                            </View>
                            {
                                this.hasChildren(item) && <Svg height="50" width="20">
                                    <Line x1="50%" y1="0" x2="50%" y2="150" stroke={this.props.pathColor} strokeWidth={this.props.strokeWidth} />
                                </Svg>
                            }
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                {
                                    item.children && item.children.map((child, index) => {
                                        return (
                                            <View key={child.Morph + child.relationship}
                                                style={{
                                                    flexDirection: 'row'
                                                }}
                                            >
                                                <View>
                                                    <Svg height="50" width="100%" >
                                                        <Line x1="50%" y1="0" x2="50%" y2="100%" stroke={this.props.pathColor} strokeWidth={this.props.strokeWidth} />
                                                        {/* Right side horizontal line */}
                                                        {
                                                            item.children.length !== 1 && item.children.length - 1 !== index &&
                                                            <Line x1="100%" y1={this.props.strokeWidth / 2} x2="50%" y2={this.props.strokeWidth / 2} stroke={this.props.pathColor} strokeWidth={this.props.strokeWidth} />
                                                        }
                                                        {/* Left side horizontal line */}
                                                        {
                                                            item.children.length !== 1 && index !== 0 &&
                                                            <Line x1="50%" y1={this.props.strokeWidth / 2} x2="0" y2={this.props.strokeWidth / 2} stroke={this.props.pathColor} strokeWidth={this.props.strokeWidth} />
                                                        }
                                                    </Svg>
                                                    {
                                                        this.renderTree([child], level + 1)
                                                    }
                                                </View>
                                                <View style={{
                                                    height: this.props.strokeWidth,
                                                    backgroundColor: item.children.length - 1 !== index ? this.props.pathColor : 'transparent',
                                                    width: child.children && (child.children.length - 1) !== index ?
                                                        level * this.props.familyGap
                                                        : 0
                                                }} />
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                    )
                }}
            />
        )
    }

    generateMorphTracking = async () => {
        const { fatherMorph, fatherDOB, motherMorph, motherDOB, grandfatherMorph, grandfatherDOB, grandmotherMorph, grandmotherDOB, fatherGrandmotherMorph, fatherGrandmotherDOB, motherGrandfatherMorph, motherGrandfatherDOB, includeGrandparents, includeGreatGrandparents, includeGreatGreatGrandparents, fatherGreatGrandfatherMorph, fatherGreatGrandfatherDOB, fatherGreatGrandmotherMorph, fatherGreatGrandmotherDOB, motherGreatGrandfatherMorph, motherGreatGrandfatherDOB, motherGreatGrandmotherMorph, motherGreatGrandmotherDOB, fatherGreatGreatGrandfatherMorph, fatherGreatGreatGrandfatherDOB, fatherGreatGreatGrandmotherMorph, fatherGreatGreatGrandmotherDOB, motherGreatGreatGrandfatherMorph, motherGreatGreatGrandfatherDOB, motherGreatGreatGrandmotherMorph, motherGreatGreatGrandmotherDOB } = this.state;
        
        const MorphTracking = {
          "Morph": "Your Reptile",
          "children": [
            {
              "Morph": fatherMorph || "Unknown",
              "dob": fatherDOB || "Unknown",
              "relationship": "Father",
              "children": includeGrandparents ? [
                {
                  "Morph": grandfatherMorph || "Unknown",
                  "dob": grandfatherDOB || "Unknown",
                  "relationship": "Grandfather",
                  "children": includeGreatGrandparents ? [
                    {
                      "Morph": fatherGreatGrandfatherMorph || "Unknown",
                      "dob": fatherGreatGrandfatherDOB || "Unknown",
                      "relationship": "Great-Grandfather",
                      "children": includeGreatGreatGrandparents ? [
                        {
                          "Morph": fatherGreatGreatGrandfatherMorph || "Unknown",
                          "dob": fatherGreatGreatGrandfatherDOB || "Unknown",
                          "relationship": "Great-Great-Grandfather"
                        },
                        {
                          "Morph": fatherGreatGreatGrandmotherMorph || "Unknown",
                          "dob": fatherGreatGreatGrandmotherDOB || "Unknown",
                          "relationship": "Great-Great-Grandmother"
                        }
                      ] : []
                    },
                    {
                      "Morph": fatherGreatGrandmotherMorph || "Unknown",
                      "dob": fatherGreatGrandmotherDOB || "Unknown",
                      "relationship": "Great-Grandmother"
                    }
                  ] : []
                },
                {
                  "Morph": fatherGrandmotherMorph || "Unknown",
                  "dob": fatherGrandmotherDOB || "Unknown",
                  "relationship": "Grandmother"
                }
              ] : []
            },
            {
              "Morph": motherMorph || "Unknown",
              "dob": motherDOB || "Unknown",
              "relationship": "Mother",
              "children": includeGrandparents ? [
                {
                  "Morph": motherGrandfatherMorph || "Unknown",
                  "dob": motherGrandfatherDOB || "Unknown",
                  "relationship": "Grandfather",
                  "children": includeGreatGrandparents ? [
                    {
                      "Morph": motherGreatGrandfatherMorph || "Unknown",
                      "dob": motherGreatGrandfatherDOB || "Unknown",
                      "relationship": "Great-Grandfather",
                      "children": includeGreatGreatGrandparents ? [
                        {
                          "Morph": motherGreatGreatGrandfatherMorph || "Unknown",
                          "dob": motherGreatGreatGrandfatherDOB || "Unknown",
                          "relationship": "Great-Great-Grandfather"
                        },
                        {
                          "Morph": motherGreatGreatGrandmotherMorph || "Unknown",
                          "dob": motherGreatGreatGrandmotherDOB || "Unknown",
                          "relationship": "Great-Great-Grandmother"
                        }
                      ] : []
                    },
                    {
                      "Morph": motherGreatGrandmotherMorph || "Unknown",
                      "dob": motherGreatGrandmotherDOB || "Unknown",
                      "relationship": "Great-Grandmother"
                    }
                  ] : []
                },
                {
                  "Morph": grandmotherMorph || "Unknown",
                  "dob": grandmotherDOB || "Unknown",
                  "relationship": "Grandmother"
                }
              ] : []
            }
          ]
        };
        
        try {
          // Get a reference to the Firestore database
          const db = getFirestore(Firebase_app);
      
          // Save ancestors data to Firestore
          await addDoc(collection(db, 'ancestors'), MorphTracking);
      
          this.setState({ MorphTracking, showFamilyTree: true });
        } catch (error) {
          console.error('Error saving data to Firestore:', error);
          // Handle the error appropriately (e.g., show an error message to the user)
        }
      };

    handleEditFamilyTree = () => {
        this.setState({ showFamilyTree: false });
    }

    toggleIncludeGrandparents = () => {
        this.setState((prevState) => ({
            includeGrandparents: !prevState.includeGrandparents,
        }));
    }
    toggleIncludeGreatGrandparents = () => {
        this.setState((prevState) => ({
            includeGreatGrandparents: !prevState.includeGreatGrandparents,
        }));
    }
    
    toggleIncludeGreatGreatGrandparents = () => {
        this.setState((prevState) => ({
            includeGreatGreatGrandparents: !prevState.includeGreatGreatGrandparents,
        }));
    }

    render() {
        const {
            title,
            titleStyle,
            titleColor
        } = this.props;
    
        const { showFamilyTree, MorphTracking, includeGrandparents, includeGreatGrandparents, includeGreatGreatGrandparents } = this.state;
    
        return (
            <View style={{ flex: 1,backgroundColor: 'lightgreen' }}>
              <Modal
    visible={showFamilyTree}
    animationType="slide"
    transparent={false}
>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ ...titleStyle, color: titleColor, marginBottom: 20, marginTop: 50 }}>{title}</Text>
        {MorphTracking && this.renderTree([MorphTracking], 1)}
        {/* Move the "Edit Tree" button here */}
        <View style={{ marginTop: 40, marginBottom: 50 }}>
            <TouchableOpacity onPress={this.handleEditFamilyTree} style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Tree</Text>
            </TouchableOpacity>
        </View>
    </View>
</Modal>
                {!showFamilyTree && (
                    <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
                        
                    
                        <Text style={{ ...titleStyle, color: titleColor }}>{title}</Text>
                        <View style={styles.buttonContainer}>
                            <Button
                                title="Generate Morph Tree"
                                onPress={this.generateMorphTracking}
                                color="green"
                                
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 100 }}>
    <Text>Include Grandparents</Text>
    <Switch
        value={includeGrandparents}
        onValueChange={this.toggleIncludeGrandparents}
    />
</View>
<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 1 }}>
    <Text>Include Great-Grandparents</Text>
    <Switch
        value={includeGreatGrandparents}
        onValueChange={this.toggleIncludeGreatGrandparents}
    />
</View>
<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: -25 }}>
    <Text>Include Great-Great-Grandparents</Text>
    <Switch
        value={includeGreatGreatGrandparents}
        onValueChange={this.toggleIncludeGreatGreatGrandparents}
    />
</View>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Father's Morph"
                            onChangeText={(text) => this.setState({ fatherMorph: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Father's DOB"
                            onChangeText={(text) => this.setState({ fatherDOB: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Mother's Morph"
                            onChangeText={(text) => this.setState({ motherMorph: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Mother's DOB"
                            onChangeText={(text) => this.setState({ motherDOB: text })}
                        />
                        {includeGrandparents && (
                            <>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Grandfather's Morph"
                                    onChangeText={(text) => this.setState({ grandfatherMorph: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Grandfather's DOB"
                                    onChangeText={(text) => this.setState({ grandfatherDOB: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Grandmother's Morph"
                                    onChangeText={(text) => this.setState({ grandmotherMorph: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Grandmother's DOB"
                                    onChangeText={(text) => this.setState({ grandmotherDOB: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Father's Grandmother's Morph"
                                    onChangeText={(text) => this.setState({ fatherGrandmotherMorph: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Father's Grandmother's DOB"
                                    onChangeText={(text) => this.setState({ fatherGrandmotherDOB: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Mother's Grandfather's Morph"
                                    onChangeText={(text) => this.setState({ motherGrandfatherMorph: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Mother's Grandfather's DOB"
                                    onChangeText={(text) => this.setState({ motherGrandfatherDOB: text })}
                                />
                            </>
                        )}
                        {includeGreatGrandparents && (
                            <>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Father's Great-Grandfather's Morph"
                                    onChangeText={(text) => this.setState({ fatherGreatGrandfatherMorph: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Father's Great-Grandfather's DOB"
                                    onChangeText={(text) => this.setState({ fatherGreatGrandfatherDOB: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Father's Great-Grandmother's Morph"
                                    onChangeText={(text) => this.setState({ fatherGreatGrandmotherMorph: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Father's Great-Grandmother's DOB"
                                    onChangeText={(text) => this.setState({ fatherGreatGrandmotherDOB: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Mother's Great-Grandfather's Morph"
                                    onChangeText={(text) => this.setState({ motherGreatGrandfatherMorph: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Mother's Great-Grandfather's DOB"
                                    onChangeText={(text) => this.setState({ motherGreatGrandfatherDOB: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Mother's Great-Grandmother's Morph"
                                    onChangeText={(text) => this.setState({ motherGreatGrandmotherMorph: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Mother's Great-Grandmother's DOB"
                                    onChangeText={(text) => this.setState({ motherGreatGrandmotherDOB: text })}
                                />
                            </>
                        )}
                        {includeGreatGreatGrandparents && (
                            <>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Father's Great-Great-Grandfather's Morph"
                                    onChangeText={(text) => this.setState({ fatherGreatGreatGrandfatherMorph: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Father's Great-Great-Grandfather's DOB"
                                    onChangeText={(text) => this.setState({ fatherGreatGreatGrandfatherDOB: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Father's Great-Great-Grandmother's Morph"
                                    onChangeText={(text) => this.setState({ fatherGreatGreatGrandmotherMorph: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Father's Great-Great-Grandmother's DOB"
                                    onChangeText={(text) => this.setState({ fatherGreatGreatGrandmotherDOB: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Mother's Great-Great-Grandfather's Morph"
                                    onChangeText={(text) => this.setState({ motherGreatGreatGrandfatherMorph: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Mother's Great-Great-Grandfather's DOB"
                                    onChangeText={(text) => this.setState({ motherGreatGreatGrandfatherDOB: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Mother's Great-Great-Grandmother's Morph"
                                    onChangeText={(text) => this.setState({ motherGreatGreatGrandmotherMorph: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Mother's Great-Great-Grandmother's DOB"
                                    onChangeText={(text) => this.setState({ motherGreatGreatGrandmotherDOB: text })}
                                />
                            </>
                        )}
                       
                          </ScrollView>
                    </KeyboardAvoidingView>
                )}
            </View>
        )
    }
}

const styles = {
    input: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 10,
        paddingHorizontal: 10,
        backgroundColor:"white",
        borderRadius:12,
        top:50
    },
    buttonContainer: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 70,
        
    },
    editButton: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'green',
       
    },
    editButtonText: {
        color: 'green',
        fontWeight: 'bold',
        textAlign: 'center',
        
    },
};

MorphTracking.defaultProps = {
    title: "Reptile's Morph Tracker",
    titleStyle: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        top:50
        

    },
    titleColor: 'black',
    nodeStyle: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: 'lightgreen',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    nodeTitleStyle: {
        fontSize: 14,
        fontWeight: "bold",
        flexShrink: 1,
    },
    pathColor: 'grey',
    siblingGap: 50,
    nodeTitleColor: "#000000",
    familyGap: 30,
    strokeWidth: 5
    
}

MorphTracking.propTypes = {
    title: PropTypes.string,
    titleStyle: PropTypes.object,
    nodeStyle: PropTypes.object,
    nodeTitleStyle: PropTypes.object,
    pathColor: PropTypes.string,
    siblingGap: PropTypes.number,
    nodeTitleColor: PropTypes.string,
    familyGap: PropTypes.number,
    strokeWidth: PropTypes.number,
    titleColor: PropTypes.string
}

