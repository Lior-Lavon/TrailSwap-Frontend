import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import Colors from '@/constants/colors';
import { SPACING, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';
import { 
  Search, 
  UserCheck, 
  Shield,
  AlertCircle,
  CheckCircle
} from 'lucide-react-native';
import { useAuthStore } from '@/store/auth-store';
import { mockUsers } from '@/mocks/users';
import { User } from '@/types';
import { Avatar } from '@/components/ui/Avatar';

export default function VerifyUserScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    // Filter users based on search query
    const query = searchQuery.toLowerCase();
    const results = mockUsers.filter(u => 
      u.id !== user?.id && // Don't include current user
      (u.firstName.toLowerCase().includes(query) || 
       u.lastName.toLowerCase().includes(query) || 
       u.email.toLowerCase().includes(query))
    );
    
    setSearchResults(results);
    setSelectedUser(null);
  };
  
  const handleSelectUser = (selectedUser: User) => {
    setSelectedUser(selectedUser);
    setSearchResults([]);
  };
  
  const handleVerifyUser = () => {
    if (!selectedUser) return;
    
    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      
      // Show success message
      Alert.alert(
        "Verification Successful",
        `You have successfully verified ${selectedUser.firstName} ${selectedUser.lastName}.`,
        [
          { 
            text: "OK", 
            onPress: () => {
              setSelectedUser(null);
              setSearchQuery('');
              router.back();
            } 
          }
        ]
      );
    }, 1500);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Verify Another User',
        }}
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.infoBox}>
          <Shield size={20} color={Colors.primary} />
          <Text style={styles.infoText}>
            Verifying other users helps build trust in the community. You can verify users you've met in person.
          </Text>
        </View>
        
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or email"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            autoCapitalize="none"
          />
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={handleSearch}
          >
            <Search size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
        
        {searchResults.length > 0 && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>Search Results</Text>
            
            {searchResults.map(user => (
              <TouchableOpacity 
                key={user.id}
                style={styles.userItem}
                onPress={() => handleSelectUser(user)}
              >
                <Avatar 
                  source={user.profileImage}
                  initials={`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`}
                  size={40}
                />
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                </View>
                <ChevronRight size={16} color={Colors.textLight} />
              </TouchableOpacity>
            ))}
          </View>
        )}
        
        {searchResults.length === 0 && searchQuery.trim() !== '' && (
          <View style={styles.emptyResults}>
            <AlertCircle size={24} color={Colors.textLight} />
            <Text style={styles.emptyResultsText}>No users found</Text>
          </View>
        )}
        
        {selectedUser && (
          <View style={styles.selectedUserContainer}>
            <Text style={styles.sectionTitle}>Selected User</Text>
            
            <View style={styles.selectedUserCard}>
              <View style={styles.selectedUserHeader}>
                <Avatar 
                  source={selectedUser.profileImage}
                  initials={`${selectedUser.firstName.charAt(0)}${selectedUser.lastName.charAt(0)}`}
                  size={60}
                />
                <View style={styles.selectedUserInfo}>
                  <Text style={styles.selectedUserName}>
                    {selectedUser.firstName} {selectedUser.lastName}
                  </Text>
                  <Text style={styles.selectedUserEmail}>{selectedUser.email}</Text>
                  
                  <View style={styles.verificationBadge}>
                    <Shield size={12} color={Colors.white} />
                    <Text style={styles.verificationText}>
                      Level {selectedUser.verificationLevel || 0}
                    </Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.verificationWarning}>
                <AlertCircle size={16} color={Colors.warning} />
                <Text style={styles.warningText}>
                  Only verify users you have met in person and can confirm their identity.
                </Text>
              </View>
              
              <View style={styles.confirmationBox}>
                <Text style={styles.confirmationTitle}>
                  I confirm that:
                </Text>
                
                <View style={styles.confirmationItem}>
                  <CheckCircle size={16} color={Colors.success} />
                  <Text style={styles.confirmationText}>
                    I have met this person in real life
                  </Text>
                </View>
                
                <View style={styles.confirmationItem}>
                  <CheckCircle size={16} color={Colors.success} />
                  <Text style={styles.confirmationText}>
                    I can confirm their identity
                  </Text>
                </View>
                
                <View style={styles.confirmationItem}>
                  <CheckCircle size={16} color={Colors.success} />
                  <Text style={styles.confirmationText}>
                    I am not being coerced to verify this user
                  </Text>
                </View>
              </View>
              
              <Button
                title="Verify User"
                onPress={handleVerifyUser}
                fullWidth
                isLoading={isVerifying}
                leftIcon={<UserCheck size={18} color={Colors.white} />}
                style={styles.verifyButton}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  infoBox: {
    backgroundColor: Colors.backgroundAlt,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  infoText: {
    fontSize: FONT_SIZE.sm,
    color: Colors.text,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  searchInput: {
    flex: 1,
    height: 46,
    backgroundColor: Colors.white,
    borderTopLeftRadius: BORDER_RADIUS.md,
    borderBottomLeftRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    fontSize: FONT_SIZE.md,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRightWidth: 0,
  },
  searchButton: {
    width: 46,
    height: 46,
    backgroundColor: Colors.primary,
    borderTopRightRadius: BORDER_RADIUS.md,
    borderBottomRightRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsContainer: {
    backgroundColor: Colors.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  resultsTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: SPACING.sm,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  userInfo: {
    flex: 1,
    marginLeft: SPACING.sm,
  },
  userName: {
    fontSize: FONT_SIZE.md,
    fontWeight: '500',
    color: Colors.text,
  },
  userEmail: {
    fontSize: FONT_SIZE.sm,
    color: Colors.textLight,
  },
  emptyResults: {
    backgroundColor: Colors.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  emptyResultsText: {
    fontSize: FONT_SIZE.md,
    color: Colors.textLight,
    marginTop: SPACING.sm,
  },
  selectedUserContainer: {
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: SPACING.sm,
  },
  selectedUserCard: {
    backgroundColor: Colors.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
  },
  selectedUserHeader: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  selectedUserInfo: {
    flex: 1,
    marginLeft: SPACING.md,
    justifyContent: 'center',
  },
  selectedUserName: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 'bold',
    color: Colors.text,
  },
  selectedUserEmail: {
    fontSize: FONT_SIZE.sm,
    color: Colors.textLight,
    marginBottom: SPACING.xs,
  },
  verificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
    alignSelf: 'flex-start',
  },
  verificationText: {
    fontSize: FONT_SIZE.xs,
    color: Colors.white,
    marginLeft: 4,
    fontWeight: '500',
  },
  verificationWarning: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.warningLight,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.md,
  },
  warningText: {
    fontSize: FONT_SIZE.sm,
    color: Colors.text,
    marginLeft: SPACING.xs,
    flex: 1,
  },
  confirmationBox: {
    backgroundColor: Colors.backgroundAlt,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  confirmationTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: SPACING.sm,
  },
  confirmationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  confirmationText: {
    fontSize: FONT_SIZE.sm,
    color: Colors.text,
    marginLeft: SPACING.xs,
  },
  verifyButton: {
    marginTop: SPACING.sm,
  },
});

// Import for ChevronRight
import { ChevronRight } from 'lucide-react-native';