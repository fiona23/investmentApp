import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, List, Avatar, Divider } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { formatCurrency } from '../utils/formatting';

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();

  // Mock user data - in real app this would come from state management
  const mockUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    isaNumber: 'ISA-2024-001',
    totalInvested: 25000,
    remainingLimit: 0,
  };

  const handleEditProfile = () => {
    // Navigate to edit profile screen
  };

  const handleViewDocuments = () => {
    // Navigate to documents screen
  };

  const handleContactSupport = () => {
    // Open support contact
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineLarge" style={styles.title}>
            Profile
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Account Settings & Information
          </Text>
        </View>

        {/* User Info Card */}
        <Card style={styles.userCard} mode="outlined">
          <Card.Content>
            <View style={styles.userHeader}>
              <Avatar.Text
                size={60}
                label={mockUser.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              />
              <View style={styles.userInfo}>
                <Text variant="titleLarge" style={styles.userName}>
                  {mockUser.name}
                </Text>
                <Text variant="bodyMedium" style={styles.userEmail}>
                  {mockUser.email}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* ISA Information */}
        <Card style={styles.infoCard} mode="outlined">
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              ISA Information
            </Text>

            <View style={styles.infoRow}>
              <Text variant="bodyMedium">ISA Number:</Text>
              <Text variant="bodyLarge" style={styles.infoValue}>
                {mockUser.isaNumber}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text variant="bodyMedium">Total Invested:</Text>
              <Text variant="bodyLarge" style={styles.infoValue}>
                {formatCurrency(mockUser.totalInvested)}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text variant="bodyMedium">Remaining Limit:</Text>
              <Text variant="bodyLarge" style={styles.infoValue}>
                {formatCurrency(mockUser.remainingLimit)}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Settings Menu */}
        <Card style={styles.settingsCard} mode="outlined">
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              Settings
            </Text>

            <List.Item
              title="Edit Profile"
              description="Update your personal information"
              left={props => <List.Icon {...props} icon="account-edit" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={handleEditProfile}
            />

            <Divider />

            <List.Item
              title="View Documents"
              description="Access your investment documents"
              left={props => <List.Icon {...props} icon="file-document" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={handleViewDocuments}
            />

            <Divider />

            <List.Item
              title="Contact Support"
              description="Get help with your account"
              left={props => <List.Icon {...props} icon="help-circle" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={handleContactSupport}
            />
          </Card.Content>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <Button
            mode="outlined"
            onPress={handleEditProfile}
            style={styles.actionButton}
          >
            Edit Profile
          </Button>

          <Button
            mode="outlined"
            onPress={handleContactSupport}
            style={styles.actionButton}
          >
            Contact Support
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    color: '#666',
  },
  userCard: {
    marginBottom: 16,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontWeight: '600',
    marginBottom: 4,
  },
  userEmail: {
    color: '#666',
  },
  infoCard: {
    marginBottom: 16,
  },
  cardTitle: {
    fontWeight: '600',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoValue: {
    fontWeight: '600',
    color: '#2196F3',
  },
  settingsCard: {
    marginBottom: 24,
  },
  actions: {
    gap: 12,
  },
  actionButton: {
    marginBottom: 8,
  },
});

export default ProfileScreen;
