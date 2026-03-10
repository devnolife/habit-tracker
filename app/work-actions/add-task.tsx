import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';

const PRIMARY = '#6366f1';

const PROJECTS = ['HabitTracker', 'Freelance', 'Personal', 'Belajar'];

const PRIORITIES = [
  { key: 'high', label: 'Tinggi', color: '#ef4444', icon: 'flag' },
  { key: 'medium', label: 'Sedang', color: '#f97316', icon: 'flag-outline' },
  { key: 'low', label: 'Rendah', color: '#22c55e', icon: 'flag-variant-outline' },
];

const DURATIONS = [15, 30, 45, 60, 90, 120];

export default function AddTaskScreen() {
  const [taskName, setTaskName] = useState('');
  const [selectedProject, setSelectedProject] = useState('HabitTracker');
  const [selectedPriority, setSelectedPriority] = useState('medium');
  const [selectedDuration, setSelectedDuration] = useState(30);
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    if (!taskName.trim()) {
      Alert.alert('Perhatian', 'Nama tugas tidak boleh kosong.');
      return;
    }
    Alert.alert(
      'Tugas Ditambahkan! ✅',
      `"${taskName}" ditambahkan ke project ${selectedProject}.\nPrioritas: ${PRIORITIES.find(p => p.key === selectedPriority)?.label}\nDurasi: ${selectedDuration} menit`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#eef2ff' }}>
      <LinearGradient colors={['#eef2ff', '#fafafa']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#111" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Tambah Tugas</Text>
            <TouchableOpacity onPress={handleSave} style={[styles.backButton, { backgroundColor: PRIMARY }]}>
              <MaterialCommunityIcons name="check" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
          >
            {/* Task Name */}
            <Text style={styles.label}>Nama Tugas</Text>
            <View style={styles.inputCard}>
              <TextInput
                style={styles.textInput}
                placeholder="Contoh: Review desain UI..."
                placeholderTextColor="#9ca3af"
                value={taskName}
                onChangeText={setTaskName}
              />
            </View>

            {/* Project */}
            <Text style={styles.label}>Project</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
              {PROJECTS.map((project) => (
                <TouchableOpacity
                  key={project}
                  onPress={() => setSelectedProject(project)}
                  style={[
                    styles.chip,
                    selectedProject === project && { backgroundColor: PRIMARY, borderColor: PRIMARY },
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      selectedProject === project && { color: '#fff' },
                    ]}
                  >
                    {project}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Priority */}
            <Text style={styles.label}>Prioritas</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              {PRIORITIES.map((priority) => (
                <TouchableOpacity
                  key={priority.key}
                  onPress={() => setSelectedPriority(priority.key)}
                  style={[
                    styles.priorityCard,
                    selectedPriority === priority.key && {
                      borderColor: priority.color,
                      backgroundColor: priority.color + '10',
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={priority.icon as any}
                    size={20}
                    color={selectedPriority === priority.key ? priority.color : '#9ca3af'}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '600',
                      color: selectedPriority === priority.key ? priority.color : '#6b7280',
                      marginTop: 4,
                    }}
                  >
                    {priority.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Duration */}
            <Text style={styles.label}>Estimasi Durasi</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {DURATIONS.map((mins) => (
                <TouchableOpacity
                  key={mins}
                  onPress={() => setSelectedDuration(mins)}
                  style={[
                    styles.durationChip,
                    selectedDuration === mins && { backgroundColor: PRIMARY, borderColor: PRIMARY },
                  ]}
                >
                  <Text
                    style={[
                      styles.durationText,
                      selectedDuration === mins && { color: '#fff' },
                    ]}
                  >
                    {mins >= 60 ? `${mins / 60} jam` : `${mins} mnt`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Notes */}
            <Text style={styles.label}>Catatan (opsional)</Text>
            <View style={[styles.inputCard, { minHeight: 100 }]}>
              <TextInput
                style={[styles.textInput, { textAlignVertical: 'top' }]}
                placeholder="Catatan tambahan..."
                placeholderTextColor="#9ca3af"
                multiline
                numberOfLines={4}
                value={notes}
                onChangeText={setNotes}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#111' },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
    marginTop: 20,
    marginBottom: 10,
  },
  inputCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  textInput: {
    fontSize: 15,
    color: '#111',
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  priorityCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
  },
  durationChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  durationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
});
